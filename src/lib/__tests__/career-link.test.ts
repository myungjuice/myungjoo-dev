import { createCareerLink } from '../career-link';

describe('createCareerLink', () => {
  it('개발 환경에서는 현재 origin으로 회사 URL을 만든다', () => {
    expect(
      createCareerLink({
        slug: 'cdri',
        origin: 'http://localhost:3000',
        environment: 'development',
      })
    ).toBe('http://localhost:3000/career/cdri');
  });

  it('개발 환경에서는 현재 origin으로 케이스 스터디 앵커 URL을 만든다', () => {
    expect(
      createCareerLink({
        slug: 'cdri',
        projectId: 2,
        origin: 'http://localhost:3000',
        environment: 'development',
      })
    ).toBe('http://localhost:3000/career/cdri#project-2');
  });

  it('개발 환경이 아니면 고정 배포 도메인으로 URL을 만든다', () => {
    expect(
      createCareerLink({
        slug: 'supertree',
        projectId: 1,
        origin: 'https://preview.example.com',
        environment: 'production',
      })
    ).toBe('https://www.myungjoo.dev/career/supertree#project-1');
  });

  it('환경 정보가 없으면 origin과 무관하게 고정 배포 도메인으로 URL을 만든다', () => {
    expect(
      createCareerLink({
        slug: 'ellen',
        origin: 'https://preview.example.com',
        environment: undefined,
      })
    ).toBe('https://www.myungjoo.dev/career/ellen');
  });
});
