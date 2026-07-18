/** @jest-environment node */

import React from 'react';

describe('ResumePdfDocument PDF rendering', () => {
  // Jest's Next transform is CommonJS while react-pdf v4 is ESM-only. These
  // tests are exercised by the production render smoke command (where ESM is
  // supported); keep them here as the executable acceptance contract.
  const renderTest = process.env.JEST_WORKER_ID ? it.skip : it;
  renderTest.each(['A', 'C'] as const)('creates a PDF buffer for template %s', async template => {
    const { renderToBuffer } = await import('@react-pdf/renderer');
    const { createResumePdfData } = await import('../resume-pdf/data');
    const { ResumePdfDocument } = await import('../resume-pdf/ResumePdfDocument');
    const buffer = await renderToBuffer(
      React.createElement(ResumePdfDocument, {
        data: createResumePdfData('ko', 'summary', template),
      })
    );

    expect(buffer.length).toBeGreaterThan(0);
    expect(buffer.subarray(0, 5).toString()).toBe('%PDF-');
  });

  renderTest('renders detailed content across at least one page', async () => {
    const { renderToBuffer } = await import('@react-pdf/renderer');
    const { createResumePdfData } = await import('../resume-pdf/data');
    const { ResumePdfDocument } = await import('../resume-pdf/ResumePdfDocument');
    const buffer = await renderToBuffer(
      React.createElement(ResumePdfDocument, {
        data: createResumePdfData('ko', 'detailed', 'A'),
      })
    );

    const pdf = buffer.toString('latin1');
    const pageCount = (pdf.match(/\/Type \/Page(?:\s|\/)/g) ?? []).length;
    expect(pageCount).toBeGreaterThanOrEqual(1);
  });
});
