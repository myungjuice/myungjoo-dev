import {
  createResumePdfData,
  createResumePdfFileName,
  resolveResumeBaseUrl,
} from '../resume-pdf/data';

describe('resume PDF data', () => {
  it('creates localized summary and detailed documents with links', () => {
    const summary = createResumePdfData('ko', 'summary', 'A');
    const detailed = createResumePdfData('en', 'detailed', 'C');
    expect(summary.careers[0].href).toBe('https://www.myungjoo.dev/career/cdri');
    expect(summary.careers[0].projects[0].href).toContain('#project-');
    expect(summary.bio).toContain('프론트엔드');
    expect(detailed.bio).toContain('frontend');
    expect(detailed.template).toBe('C');
    expect(summary.careers[0].projects).toHaveLength(1);
    expect(detailed.careers[0].projects.length).toBeGreaterThan(summary.careers[0].projects.length);
    expect(summary.skills).toHaveLength(5);
    expect(detailed.skills.length).toBeGreaterThan(summary.skills.length);
  });
  it('uses localhost only for local environments', () => {
    expect(resolveResumeBaseUrl({ hostname: 'localhost', protocol: 'http:', port: '5173' })).toBe(
      'http://localhost:3000'
    );
    expect(createResumePdfData('ko', 'summary', 'A', 'http://localhost:5173').baseUrl).toBe(
      'http://localhost:3000'
    );
    expect(createResumePdfData('ko', 'summary', 'A', 'https://preview.example.com').baseUrl).toBe(
      'https://www.myungjoo.dev'
    );
    expect(resolveResumeBaseUrl({ hostname: 'example.com', protocol: 'https:', port: '' })).toBe(
      'https://www.myungjoo.dev'
    );
  });
  it('generates deterministic file names', () => {
    expect(createResumePdfFileName('ko', 'summary', 'B')).toBe(
      'myungjoo-resume-ko-summary-template-B.pdf'
    );
  });
});
