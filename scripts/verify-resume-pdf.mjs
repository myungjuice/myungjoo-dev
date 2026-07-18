import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import React from 'react';
import { Font, renderToBuffer } from '@react-pdf/renderer';
import { join } from 'node:path';
import dataModule from '../src/lib/resume-pdf/data.ts';
import documentModule from '../src/lib/resume-pdf/ResumePdfDocument.tsx';
const { createResumePdfData, createResumePdfFileName } = dataModule;
const { ResumePdfDocument } = documentModule;
Font.register({ family: 'Noto Sans KR', src: join(process.cwd(), 'src/lib/resume-pdf/fonts/NotoSansKR-Regular.ttf') });

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
  if (!buffer.subarray(0, 5).equals(Buffer.from('%PDF-'))) throw new Error(`Template ${template}: invalid PDF`);
  const file = join(outDir, createResumePdfFileName(language, format, template));
  await writeFile(file, buffer);
  const source = buffer.toString('latin1');
  const pages = (source.match(/\/Type \/Page(?:\s|\/)/g) ?? []).length;
  if (pages < 1) throw new Error(`Template ${template}: no pages`);
  try {
    const info = execFileSync('pdfinfo', [file], { encoding: 'utf8' });
    if (!/Pages:\s*[1-9]/.test(info)) throw new Error(`Template ${template}: pdfinfo reports no pages`);
    execFileSync('pdftoppm', ['-f', '1', '-l', '1', '-singlefile', '-png', file, join(outDir, `${language}-${format}-${template}`)]);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    console.warn('pdfinfo/pdftoppm unavailable; PDF structural checks passed.');
  }
  console.log(`${language}/${format}/${template}: ${pages} page(s), ${buffer.length} bytes`);
}
console.log(`Verified ${combinations.length} combinations. Wrote ${outDir}`);
