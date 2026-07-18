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
    expect(summary.careers[0].projects.length).toBe(detailed.careers[0].projects.length);
    expect(summary.skills).toHaveLength(detailed.skills.length);
  });
  it('uses localhost only for local environments', () => {
    expect(resolveResumeBaseUrl({ hostname: 'localhost', protocol: 'http:', port: '5173' })).toBe(
      'http://localhost:5173'
    );
    expect(createResumePdfData('ko', 'summary', 'A', 'http://localhost:5173').baseUrl).toBe(
      'http://localhost:5173'
    );
    expect(createResumePdfData('ko', 'summary', 'A', 'https://preview.example.com').baseUrl).toBe(
      'https://www.myungjoo.dev'
    );
    expect(resolveResumeBaseUrl({ hostname: 'example.com', protocol: 'https:', port: '' })).toBe(
      'https://www.myungjoo.dev'
    );
  });
  it('generates deterministic file names', () => {
    expect(createResumePdfFileName('ko', 'summary', 'C')).toBe('장명주_이력서_요약_C.pdf');
    expect(createResumePdfFileName('ko', 'detailed', 'A')).toBe('장명주_이력서_상세_A.pdf');
    expect(createResumePdfFileName('en', 'summary', 'C')).toBe(
      'MyungJoo_Jang_Resume_Summary_C.pdf'
    );
    expect(createResumePdfFileName('en', 'detailed', 'A')).toBe(
      'MyungJoo_Jang_Resume_Detailed_A.pdf'
    );
  });
  it('includes the default email and an empty phone when contact env vars are absent', () => {
    const originalPhone = process.env.NEXT_PUBLIC_RESUME_PHONE;
    const originalEmail = process.env.NEXT_PUBLIC_RESUME_EMAIL;
    delete process.env.NEXT_PUBLIC_RESUME_PHONE;
    delete process.env.NEXT_PUBLIC_RESUME_EMAIL;

    const data = createResumePdfData('ko', 'summary', 'A');

    expect(data.email).toBe('wkdaudwn1028@gmail.com');
    expect(data.phone).toBe('');
    if (originalPhone === undefined) delete process.env.NEXT_PUBLIC_RESUME_PHONE;
    else process.env.NEXT_PUBLIC_RESUME_PHONE = originalPhone;
    if (originalEmail === undefined) delete process.env.NEXT_PUBLIC_RESUME_EMAIL;
    else process.env.NEXT_PUBLIC_RESUME_EMAIL = originalEmail;
  });
  it('prioritizes contact environment variables', () => {
    const originalPhone = process.env.NEXT_PUBLIC_RESUME_PHONE;
    const originalEmail = process.env.NEXT_PUBLIC_RESUME_EMAIL;
    process.env.NEXT_PUBLIC_RESUME_PHONE = '010-1234-5678';
    process.env.NEXT_PUBLIC_RESUME_EMAIL = 'resume@example.com';

    const data = createResumePdfData('ko', 'summary', 'A');

    expect(data.phone).toBe('010-1234-5678');
    expect(data.email).toBe('resume@example.com');
    if (originalPhone === undefined) delete process.env.NEXT_PUBLIC_RESUME_PHONE;
    else process.env.NEXT_PUBLIC_RESUME_PHONE = originalPhone;
    if (originalEmail === undefined) delete process.env.NEXT_PUBLIC_RESUME_EMAIL;
    else process.env.NEXT_PUBLIC_RESUME_EMAIL = originalEmail;
  });
});
