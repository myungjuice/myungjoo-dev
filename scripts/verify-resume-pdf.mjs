import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import React from 'react';
import { Font, renderToBuffer } from '@react-pdf/renderer';
import { join } from 'node:path';
import { createResumePdfData, createResumePdfFileName } from '../src/lib/resume-pdf/data.ts';
import { ResumePdfDocument } from '../src/lib/resume-pdf/ResumePdfDocument.tsx';
Font.register({
  family: 'Noto Sans KR',
  src: join(process.cwd(), 'src/lib/resume-pdf/fonts/NotoSansKR-Regular.ttf'),
});

const outDir = join(process.cwd(), 'tmp', 'pdfs');
await mkdir(outDir, { recursive: true });
const combinations = [];
for (const language of ['ko', 'en']) {
  for (const format of ['summary', 'detailed']) {
    for (const template of ['A', 'C']) combinations.push({ language, format, template });
  }
}
for (const { language, format, template } of combinations) {
  const data = createResumePdfData(language, format, template);
  const buffer = await renderToBuffer(React.createElement(ResumePdfDocument, { data }));
  if (!buffer.subarray(0, 5).equals(Buffer.from('%PDF-')))
    throw new Error(`Template ${template}: invalid PDF`);
  const file = join(outDir, createResumePdfFileName(language, format, template));
  await writeFile(file, buffer);
  const source = buffer.toString('latin1');
  const pages = (source.match(/\/Type \/Page(?:\s|\/)/g) ?? []).length;
  if (pages < 1) throw new Error(`템플릿 ${template}: 페이지가 없습니다`);
  try {
    const info = execFileSync('pdfinfo', [file], { encoding: 'utf8' });
    if (!/Pages:\s*[1-9]/.test(info))
      throw new Error(`템플릿 ${template}: pdfinfo에 페이지가 없습니다`);
    execFileSync('pdftoppm', [
      '-f',
      '1',
      '-l',
      '1',
      '-singlefile',
      '-png',
      file,
      join(outDir, `${language}-${format}-${template}`),
    ]);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    console.warn('pdfinfo/pdftoppm을 사용할 수 없어 PDF 구조 검사만 완료했습니다.');
  }
  console.log(`${language}/${format}/${template}: ${pages}페이지, ${buffer.length}바이트`);
}
console.log(`${combinations.length}개 조합 검증 완료. 출력 위치: ${outDir}`);
