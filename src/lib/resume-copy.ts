import { careerFilterList, careerMockData } from '@/constants/career';
import { page } from '@/constants/metadata';
import { projectsMockData } from '@/constants/projects';
import about from '@/lib/i18n/about';

export type ResumeLanguage = 'ko' | 'en';
export type ResumeFormat = 'summary' | 'detailed';

const resumeTitle = {
  ko: {
    name: '장명주',
    introduction: '소개',
    skills: '기술 스택',
    career: '경력',
    mainProjects: '주요 프로젝트',
    projectDetails: '프로젝트 상세',
    period: '기간',
    links: '링크',
    github: 'GitHub',
    publicProfiles: '공개 프로필',
    context: '배경',
    problem: '문제',
    actions: '실행',
    impact: '성과',
    reflection: '회고',
  },
  en: {
    name: 'MyungJoo Jang',
    introduction: 'Introduction',
    skills: 'Technical Skills',
    career: 'Career',
    mainProjects: 'Key Projects',
    projectDetails: 'Project Details',
    period: 'Period',
    links: 'Links',
    github: 'GitHub',
    publicProfiles: 'Public Profiles',
    context: 'Context',
    problem: 'Problem',
    actions: 'Actions',
    impact: 'Impact',
    reflection: 'Reflection',
  },
} as const;

const removeCommentSyntax = (text: string): string =>
  text
    .replace(/^\s*\/\*\*\s*/u, '')
    .replace(/\s*\*\/\s*$/u, '')
    .split('\n')
    .map(line => line.replace(/^\s*\*\s?/u, '').trim())
    .filter(Boolean)
    .join('\n');

const createCaseStudySection = (label: string, value?: string): string =>
  value ? `### ${label}\n${value}` : '';

export const createResumeText = (language: ResumeLanguage, format: ResumeFormat): string => {
  const title = resumeTitle[language];
  const localizedAbout = about[language];
  const careers = careerFilterList.map(careerId => careerMockData[language][careerId]);
  const portfolio = projectsMockData[language].portfolio;
  const profileLinks = [
    process.env.NEXT_PUBLIC_GITHUB_URL,
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
    process.env.NEXT_PUBLIC_WANTED_URL,
    process.env.NEXT_PUBLIC_TELEGRAM_URL,
  ].filter((url): url is string => Boolean(url));

  const sections = [
    `# ${title.name}`,
    `## ${title.introduction}\n${removeCommentSyntax(localizedAbout.bio)}`,
    `## ${title.skills}\n${removeCommentSyntax(localizedAbout['hard-skills'])
      .split('\n')
      .map(skill => `- ${skill}`)
      .join('\n')}`,
    `## ${title.career}\n${careers
      .map(career =>
        `### ${career.name} | ${career.role}\n- ${title.period}: ${career.period}\n- ${career.slogan ?? ''}`.trim()
      )
      .join('\n\n')}`,
    `## ${title.mainProjects}\n${careers
      .flatMap(career =>
        career.projects.map(project => `### ${project.title}\n- ${project.description}`)
      )
      .concat(`### ${portfolio.name}\n- ${portfolio.description.trim()}`)
      .join('\n\n')}`,
    `## ${title.links}\n- ${title.links}: ${page.root.url}\n- ${title.github}: ${portfolio.githubUrl}`,
    profileLinks.length > 0
      ? `## ${title.publicProfiles}\n${profileLinks.map(url => `- ${url}`).join('\n')}`
      : '',
  ];

  if (format === 'detailed') {
    sections.push(
      `## ${title.projectDetails}\n${careers
        .flatMap(career =>
          career.projects.map(project => {
            const caseStudy = project.caseStudy;
            const detailSections = [
              `### ${project.title}\n${project.description}`,
              createCaseStudySection(title.context, caseStudy?.context),
              createCaseStudySection(title.problem, caseStudy?.problem),
              caseStudy?.action?.length
                ? `### ${title.actions}\n${caseStudy.action.map(item => `- ${item}`).join('\n')}`
                : '',
              caseStudy?.impact?.length
                ? `### ${title.impact}\n${caseStudy.impact.map(item => `- ${item}`).join('\n')}`
                : '',
              createCaseStudySection(title.reflection, caseStudy?.reflection),
            ];

            return detailSections.filter(Boolean).join('\n\n');
          })
        )
        .join('\n\n')}`
    );
  }

  return sections.filter(Boolean).join('\n\n');
};
