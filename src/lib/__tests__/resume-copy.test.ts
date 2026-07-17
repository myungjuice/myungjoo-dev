import { createResumeText } from '../resume-copy';

describe('createResumeText', () => {
  it('한국어 요약본에 소개, 기술, 경력, 프로젝트, 링크를 포함한다', () => {
    const result = createResumeText('ko', 'summary');

    expect(result).toContain('# 장명주');
    expect(result).toContain('## 기술 스택');
    expect(result).toContain('## 경력');
    expect(result).toContain('## 주요 프로젝트');
    expect(result).toContain('https://myungjoo.dev');
    expect(result).not.toContain('## 프로젝트 상세');
  });

  it('영어 상세본에 케이스 스터디의 다섯 항목을 포함한다', () => {
    const result = createResumeText('en', 'detailed');

    expect(result).toContain('# MyungJoo Jang');
    expect(result).toContain('## Project Details');
    expect(result).toContain('### Context');
    expect(result).toContain('### Problem');
    expect(result).toContain('### Actions');
    expect(result).toContain('### Impact');
    expect(result).toContain('### Reflection');
  });

  it('케이스 스터디가 없는 프로젝트도 상세본 생성에 실패하지 않는다', () => {
    expect(() => createResumeText('ko', 'detailed')).not.toThrow();
  });
});
