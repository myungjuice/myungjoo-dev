import { careerFilterList, careerMockData } from '@/constants/career';
import { projectsMockData } from '@/constants/projects';
import about from '@/lib/i18n/about';

import type {
  ResumePdfDocumentData,
  ResumePdfFormat,
  ResumePdfLanguage,
  ResumePdfTemplate,
} from './types';

const DEPLOYED_URL = 'https://www.myungjoo.dev';
const stripComment = (value: string) =>
  value
    .replace(/^\s*\/\*\*?\s*/u, '')
    .replace(/\s*\*\/\s*$/u, '')
    .split('\n')
    .map(line => line.replace(/^\s*\*\s?/u, '').trim())
    .filter(Boolean);

export const resolveResumeBaseUrl = (
  location?: Pick<Location, 'hostname' | 'protocol' | 'port'>
): string => {
  if (location?.hostname === 'localhost' || location?.hostname === '127.0.0.1') {
    return 'http://localhost:3000';
  }
  return DEPLOYED_URL;
};

export const createResumePdfFileName = (
  language: ResumePdfLanguage,
  format: ResumePdfFormat,
  _template: ResumePdfTemplate
): string => {
  if (language === 'ko') {
    return `장명주_이력서_${format === 'summary' ? '요약' : '상세'}.pdf`;
  }
  return `MyungJoo_Jang_Resume_${format === 'summary' ? 'Summary' : 'Detailed'}.pdf`;
};

export const createResumePdfData = (
  language: ResumePdfLanguage,
  format: ResumePdfFormat,
  template: ResumePdfTemplate,
  baseUrl = DEPLOYED_URL
): ResumePdfDocumentData => {
  const parsedBaseUrl = (() => {
    try {
      const parsed = new URL(baseUrl);
      return parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1'
        ? 'http://localhost:3000'
        : DEPLOYED_URL;
    } catch {
      return DEPLOYED_URL;
    }
  })();
  const localizedAbout = about[language];
  const careers = careerFilterList.map(id => {
    const career = careerMockData[language][id];
    return {
      ...career,
      id,
      href: `${parsedBaseUrl}/career/${id}`,
      contribution: format === 'detailed' ? career.overview?.contribution : undefined,
      achievements: format === 'detailed' ? (career.overview?.achievements ?? []) : [],
      projects: (format === 'detailed' ? career.projects : career.projects.slice(0, 1)).map(
        project => ({
          ...project,
          href: `${parsedBaseUrl}/career/${id}#project-${project.id}`,
        })
      ),
    };
  });
  const portfolio = projectsMockData[language].portfolio;
  const links = [
    {
      label: 'GitHub',
      href: process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/myungjuice',
    },
    { label: 'LinkedIn', href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? '' },
    { label: 'Wanted', href: process.env.NEXT_PUBLIC_WANTED_URL ?? '' },
  ].filter(link => link.href);
  return {
    language,
    format,
    template,
    name: language === 'ko' ? '장명주' : 'MyungJoo Jang',
    title: language === 'ko' ? 'Frontend Developer' : 'Frontend Developer',
    phone: process.env.NEXT_PUBLIC_RESUME_PHONE || '',
    email: process.env.NEXT_PUBLIC_RESUME_EMAIL || 'wkdaudwn1028@gmail.com',
    bio: (format === 'detailed'
      ? stripComment(localizedAbout.bio)
      : stripComment(localizedAbout.bio).slice(0, 2)
    ).join(' '),
    skills:
      format === 'detailed'
        ? stripComment(localizedAbout['hard-skills'])
        : stripComment(localizedAbout['hard-skills']).slice(0, 5),
    careers,
    portfolio: {
      name: portfolio.name,
      description: portfolio.description.trim(),
      href: `${parsedBaseUrl}/projects`,
      githubUrl: portfolio.githubUrl,
    },
    links: [{ label: 'Portfolio', href: parsedBaseUrl }, ...links],
    baseUrl: parsedBaseUrl,
  };
};
