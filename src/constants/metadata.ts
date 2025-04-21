type PageName = 'root' | 'about' | 'career' | 'projects';

type PageMetadata = {
  title: string;
  url: string;
  description?: string;
};

export const shared = {
  ogImage: '/images/og-image.png',
  siteName: 'Myungjoo',
  type: 'website' as const,
  twitterCard: 'summary_large_image' as const,
};

export const page: Record<PageName, PageMetadata> = {
  root: {
    title: '장명주',
    url: 'https://myungjoo.dev',
    description: '프론트엔드 개발자 장명주의 기술과 경험을 소개합니다.',
  },
  about: {
    title: 'About | 장명주',
    url: 'https://myungjoo.dev/about',
    description:
      '프론트엔드 개발자 장명주의 자기소개, 취미, 가치관 등을 소개합니다. 제 얘기좀 들어보시겠어요?',
  },
  career: {
    title: 'Career | 장명주',
    url: 'https://myungjoo.dev/career',
    description: '프론트엔드 개발자 장명주의 커리어 여정을 소개합니다. 삽질도 경험이죠..ㅎ',
  },
  projects: {
    title: 'Projects | 장명주',
    url: 'https://myungjoo.dev/projects',
    description:
      '개인 및 협업으로 진행한 주요 프로젝트를 소개합니다. 실패와 성공 사이 어딘가에서 코드를 쌓아올렸습니다.',
  },
};
