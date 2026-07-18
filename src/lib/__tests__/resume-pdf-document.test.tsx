import { createResumePdfData } from '../resume-pdf/data';

describe('ResumePdfDocument templates', () => {
  it.each(['A', 'B', 'C'] as const)('dispatches template %s', template => {
    const data = createResumePdfData('ko', 'summary', template);
    expect(data.template).toBe(template);
    expect(data.careers[0].href).toMatch(/\/career\//);
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
});
