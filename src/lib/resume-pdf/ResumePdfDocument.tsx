import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Document, Font, Page } from '@react-pdf/renderer';

import { pdfStyles as s } from './styles';
import { TemplateA } from './templates/TemplateA';
import { TemplateB } from './templates/TemplateB';
import { TemplateC } from './templates/TemplateC';
import type { ResumePdfDocumentData } from './types';

// Keep the font in the repository so PDF generation is deterministic in CI and
// does not depend on whichever fonts happen to be installed on the host.
const notoSansKr = join(dirname(fileURLToPath(import.meta.url)), 'fonts/NotoSansKR-Regular.ttf');
const registerNotoSansKr = () =>
  Font?.register?.({ family: 'Noto Sans KR', src: notoSansKr, fontWeight: 'normal' });

export function ResumePdfDocument({ data }: { data: ResumePdfDocumentData }) {
  registerNotoSansKr();
  const Content = data.template === 'A' ? TemplateA : data.template === 'B' ? TemplateB : TemplateC;
  return (
    <Document title={`${data.name} Resume`}>
      <Page size='A4' wrap style={data.template === 'B' ? s.panelPage : s.page}>
        <Content data={data} />
      </Page>
    </Document>
  );
}
