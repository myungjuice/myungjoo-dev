import { careerFilterList, careerMockData } from '@/constants/career';
import resumeContent from '@/content/resume.json';

import type {
  ResumePdfDocumentData,
  ResumePdfFormat,
  ResumePdfLanguage,
  ResumePdfTemplate,
} from './types';

const DEPLOYED_URL = resumeContent.ko.links.website;

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
  const resumeLocale = resumeContent[language];
  const careers = careerFilterList.map(id => {
    const career = careerMockData[language][id];
    return {
      ...career,
      id,
      href: `${parsedBaseUrl}/career/${id}`,
      contribution: career.overview?.contribution,
      achievements: career.overview?.achievements ?? [],
      projects: career.projects.map(project => ({
        ...project,
        caseStudy: format === 'detailed' ? project.caseStudy : undefined,
        href: `${parsedBaseUrl}/career/${id}#project-${project.id}`,
      })),
    };
  });
  const links = [
    {
      label: 'GitHub',
      href: process.env.NEXT_PUBLIC_GITHUB_URL ?? resumeLocale.links.github,
    },
    {
      label: 'LinkedIn',
      href: process.env.NEXT_PUBLIC_LINKEDIN_URL || resumeLocale.links.linkedin,
    },
  ].filter(link => link.href);
  return {
    language,
    format,
    template,
    name: resumeLocale.profile.name,
    title: resumeLocale.profile.title,
    phone: process.env.NEXT_PUBLIC_RESUME_PHONE || '',
    email: process.env.NEXT_PUBLIC_RESUME_EMAIL || resumeLocale.profile.email,
    bio: resumeLocale.profile.bio,
    skills: resumeLocale.skills,
    careers,
    portfolio: {
      name: resumeLocale.portfolio.name,
      description: resumeLocale.portfolio.description,
      href: `${parsedBaseUrl}/projects`,
      githubUrl: resumeLocale.portfolio.githubUrl,
    },
    links,
    baseUrl: parsedBaseUrl,
  };
};
