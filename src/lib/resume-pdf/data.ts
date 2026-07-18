import { careerFilterList, careerMockData } from '@/constants/career';
import { page } from '@/constants/metadata';
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
    return `http://localhost:${location.port || '3000'}`;
  }
  return DEPLOYED_URL;
};

export const createResumePdfFileName = (
  language: ResumePdfLanguage,
  format: ResumePdfFormat,
  template: ResumePdfTemplate
): string => `myungjoo-resume-${language}-${format}-template-${template}.pdf`;

export const createResumePdfData = (
  language: ResumePdfLanguage,
  format: ResumePdfFormat,
  template: ResumePdfTemplate,
  baseUrl = DEPLOYED_URL
): ResumePdfDocumentData => {
  const localizedAbout = about[language];
  const careers = careerFilterList.map(id => {
    const career = careerMockData[language][id];
    return {
      ...career,
      id,
      href: `${baseUrl}/career/${id}`,
      contribution: career.overview?.contribution,
      achievements: career.overview?.achievements ?? [],
      projects: career.projects.map(project => ({
        ...project,
        href: `${baseUrl}/career/${id}#project-${project.id}`,
      })),
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
    bio: stripComment(localizedAbout.bio).join(' '),
    skills: stripComment(localizedAbout['hard-skills']),
    careers,
    portfolio: {
      name: portfolio.name,
      description: portfolio.description.trim(),
      href: `${baseUrl}/projects`,
      githubUrl: portfolio.githubUrl,
    },
    links: [{ label: 'Portfolio', href: page.root.url }, ...links],
    baseUrl,
  };
};
