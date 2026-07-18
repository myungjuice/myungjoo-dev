import { Document, Page } from '@react-pdf/renderer';

import { pdfStyles as s } from './styles';
import { TemplateA } from './templates/TemplateA';
import { TemplateB } from './templates/TemplateB';
import { TemplateC } from './templates/TemplateC';
import type { ResumePdfDocumentData } from './types';

export function ResumePdfDocument({ data }: { data: ResumePdfDocumentData }) {
  const Content = data.template === 'A' ? TemplateA : data.template === 'B' ? TemplateB : TemplateC;
  return (
    <Document title={`${data.name} Resume`}>
      <Page size='A4' wrap style={data.template === 'B' ? s.panelPage : s.page}>
        <Content data={data} />
      </Page>
    </Document>
  );
}
