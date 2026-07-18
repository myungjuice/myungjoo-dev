import { careerFilterList, careerMockData } from '@/constants/career';
import resumeContent from '@/content/resume.json';
import type { CareerCompany } from '@/types/career';

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
    contribution: '전반적 기여',
    achievements: '주요 성과',
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
    contribution: 'Contribution',
    achievements: 'Key Achievements',
  },
} as const;

const createCaseStudySection = (label: string, value?: string): string =>
  value ? `### ${label}\n${value}` : '';

const createCareerOverviewText = (
  career: CareerCompany,
  title: (typeof resumeTitle)[ResumeLanguage]
): string => {
  const overview = career.overview;
  if (!overview) return '';

  const achievements = overview.achievements.length
    ? `### ${title.achievements}\n${overview.achievements.map(item => `- ${item}`).join('\n')}`
    : '';
  const contribution = overview.contribution
    ? `### ${title.contribution}\n${overview.contribution}`
    : '';

  return [contribution, achievements].filter(Boolean).join('\n\n');
};

export const createResumeText = (language: ResumeLanguage, format: ResumeFormat): string => {
  const title = resumeTitle[language];
  const resumeLocale = resumeContent[language];
  const careers = careerFilterList.map(careerId => careerMockData[language][careerId]);
  const profileLinks = [
    process.env.NEXT_PUBLIC_GITHUB_URL,
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
    process.env.NEXT_PUBLIC_WANTED_URL,
    process.env.NEXT_PUBLIC_TELEGRAM_URL,
  ].filter((url): url is string => Boolean(url));

  const sections = [
    `# ${resumeLocale.profile.name}`,
    `## ${title.introduction}\n${resumeLocale.profile.bio}`,
    `## ${title.skills}\n${resumeLocale.skills.map(skill => `- ${skill}`).join('\n')}`,
    `## ${title.career}\n${careers
      .map(career =>
        [
          `### ${career.name} | ${career.role}\n- ${title.period}: ${career.period}\n- ${career.slogan ?? ''}`.trim(),
          createCareerOverviewText(career, title),
        ]
          .filter(Boolean)
          .join('\n')
      )
      .join('\n\n')}`,
    `## ${title.mainProjects}\n${careers
      .flatMap(career =>
        career.projects.map(project => `### ${project.title}\n- ${project.description}`)
      )
      .concat(`### ${resumeLocale.portfolio.name}`)
      .join('\n\n')}`,
    `## ${title.links}\n- ${title.links}: ${resumeLocale.links.website}\n- ${title.github}: ${resumeLocale.links.github}`,
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
