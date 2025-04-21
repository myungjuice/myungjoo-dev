const common = {
  portfolio: {
    id: 1,
    tech: 'react',
    thumbnailUrl: '/images/portfolio_thumbnail.png',
    githubUrl: 'https://github.com/wkdaudwn11/portfolio',
  },
};

const projectsI18n = {
  ko: {
    portfolio: {
      ...common.portfolio,
      name: '포트폴리오 웹사이트',
      description:
        'Next.js와 TypeScript로 만든 개인 포트폴리오 사이트입니다. 반응형 디자인과 다크 모드, 다국어 기능을 지원합니다.',
      githubButtonText: '깃허브',
    },
  },
  en: {
    portfolio: {
      ...common.portfolio,
      name: 'Portfolio Website',
      description:
        'This is a personal portfolio website built with Next.js and TypeScript. It supports responsive design, dark mode, and multilingual functionality.',
      githubButtonText: 'Github',
    },
  },
};

export default projectsI18n;
