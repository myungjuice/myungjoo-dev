import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import React from 'react';
import { Font, renderToBuffer } from '@react-pdf/renderer';
import { join } from 'node:path';
import dataModule from '../src/lib/resume-pdf/data.ts';
import documentModule from '../src/lib/resume-pdf/ResumePdfDocument.tsx';
const { createResumePdfData } = dataModule;
const { ResumePdfDocument } = documentModule;
Font.register({ family: 'Noto Sans KR', src: join(process.cwd(), 'src/lib/resume-pdf/fonts/NotoSansKR-Regular.ttf') });

const outDir = join(process.cwd(), 'tmp', 'resume-pdf-verification');
await mkdir(outDir, { recursive: true });
for (const template of ['A', 'B', 'C']) {
  const buffer = await renderToBuffer(
    React.createElement(ResumePdfDocument, {
      data: createResumePdfData('ko', 'detailed', template),
    })
  );
  if (!buffer.subarray(0, 5).equals(Buffer.from('%PDF-'))) throw new Error(`Template ${template}: invalid PDF`);
  const file = join(outDir, `resume-${template}.pdf`);
  await writeFile(file, buffer);
  const source = buffer.toString('latin1');
  const pages = (source.match(/\/Type \/Page(?:\s|\/)/g) ?? []).length;
  if (pages < 1) throw new Error(`Template ${template}: no pages`);
  try {
    const info = execFileSync('pdfinfo', [file], { encoding: 'utf8' });
    if (!/Pages:\s*[1-9]/.test(info)) throw new Error(`Template ${template}: pdfinfo reports no pages`);
    execFileSync('pdftoppm', ['-f', '1', '-l', '1', '-singlefile', '-png', file, join(outDir, `resume-${template}`)]);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    console.warn('pdfinfo/pdftoppm unavailable; PDF structural checks passed.');
  }
  console.log(`Template ${template}: ${pages} page(s), ${buffer.length} bytes`);
}
console.log(`Wrote ${outDir}`);
