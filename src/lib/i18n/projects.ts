const common = {
  portfolio: {
    id: 1,
    tech: 'react',
    thumbnailUrl: '/images/portfolio_thumbnail.png',
    githubUrl: 'https://github.com/myungjuice/portfolio',
  },
};

const projectsI18n = {
  ko: {
    portfolio: {
      ...common.portfolio,
      name: 'myungjoo.dev',
      description: `저에 대한 소개를 하는 사이트입니다.
Next.js와 TypeScript로 만들었으며 반응형 디자인과 다크 모드, 다국어 기능을 지원합니다.
`,
      githubButtonText: '깃허브',
    },
  },
  en: {
    portfolio: {
      ...common.portfolio,
      name: 'Portfolio Website',
      description: `This is a website that introduces myself.
Built with Next.js and TypeScript, it supports responsive design, dark mode, and multilingual features.
`,
      githubButtonText: 'Github',
    },
  },
};

export default projectsI18n;
