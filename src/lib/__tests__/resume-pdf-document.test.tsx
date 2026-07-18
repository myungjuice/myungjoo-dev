import React from 'react';

jest.mock('@react-pdf/renderer', () => {
  const createPrimitive = (name: string) => {
    const Primitive = ({ children, ...props }: { children?: React.ReactNode }) =>
      React.createElement(name, props, children);
    Primitive.displayName = name;
    return Primitive;
  };
  return {
    Document: createPrimitive('Document'),
    Page: createPrimitive('Page'),
    Link: createPrimitive('Link'),
    Text: createPrimitive('Text'),
    View: createPrimitive('View'),
    StyleSheet: { create: (styles: unknown) => styles },
  };
});

import { createResumePdfData } from '../resume-pdf/data';
import { ResumePdfDocument } from '../resume-pdf/ResumePdfDocument';

function textContent(node: unknown): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textContent).join(' ');
  if (typeof node === 'object' && node !== null && 'props' in node) {
    const element = node as {
      type?: unknown;
      props?: { children?: unknown };
    };
    if (typeof element.type === 'function') {
      return textContent((element.type as (props: unknown) => unknown)(element.props));
    }
    return textContent(element.props?.children);
  }
  return '';
}

describe('ResumePdfDocument templates', () => {
  it.each(['A', 'B', 'C'] as const)('dispatches template %s', template => {
    const data = createResumePdfData('ko', 'summary', template);
    expect(data.template).toBe(template);
    expect(data.careers[0].href).toMatch(/\/career\//);
    const document = ResumePdfDocument({ data });
    expect(textContent(document)).toContain(data.name);
  });

  it('supports English labels/content and links', () => {
    const data = createResumePdfData('en', 'detailed', 'B');
    expect(data.name).toBe('MyungJoo Jang');
    expect(data.bio.toLowerCase()).toContain('frontend');
    expect(data.links.some(link => link.href === data.baseUrl)).toBe(true);
    expect(data.portfolio.githubUrl).toMatch(/^https?:\/\//);
  });

  it('renders summary as a compact subset of detailed content', () => {
    const summary = createResumePdfData('ko', 'summary', 'A');
    const detailed = createResumePdfData('ko', 'detailed', 'A');
    expect(summary.careers[0].contribution).toBeUndefined();
    expect(detailed.careers[0].contribution).toBeDefined();
    expect(summary.careers[0].projects.length).toBeLessThanOrEqual(
      detailed.careers[0].projects.length
    );
  });

  it('keeps detailed-only content out of summary and includes it in templates', () => {
    const summary = createResumePdfData('ko', 'summary', 'A');
    const detailed = createResumePdfData('ko', 'detailed', 'C');
    const summaryTree = ResumePdfDocument({ data: summary });
    const detailedTree = ResumePdfDocument({ data: detailed });
    const achievement = detailed.careers[0].achievements[0];
    expect(textContent(summaryTree)).not.toContain(achievement);
    expect(textContent(detailedTree)).toContain(achievement);
  });
});
