import type { CareerFilterItem, CareerProject } from '@/types/career';

export type ResumePdfTemplate = 'A' | 'B' | 'C';
export type ResumePdfFormat = 'summary' | 'detailed';
export type ResumePdfLanguage = 'ko' | 'en';

export type ResumePdfLink = { label: string; href: string };
export type ResumePdfCareer = {
  id: CareerFilterItem;
  name: string;
  period: string;
  role: string;
  slogan?: string;
  contribution?: string;
  achievements: string[];
  projects: Array<CareerProject & { href: string }>;
  href: string;
};

export type ResumePdfDocumentData = {
  language: ResumePdfLanguage;
  format: ResumePdfFormat;
  template: ResumePdfTemplate;
  name: string;
  title: string;
  phone: string;
  email: string;
  bio: string;
  skills: string[];
  careers: ResumePdfCareer[];
  portfolio: { name: string; description: string; href: string; githubUrl: string };
  links: ResumePdfLink[];
  baseUrl: string;
};

export const resumeLabels = {
  ko: {
    skills: '기술 스택',
    careers: '경력',
    projects: '프로젝트',
    intro: '소개',
    detailCta: '자세한 경력과 프로젝트는 포트폴리오에서 확인해 주세요',
    site: '사이트',
    contribution: '주요 기여',
    achievements: '주요 성과',
  },
  en: {
    skills: 'Skills',
    careers: 'Experience',
    projects: 'Projects',
    intro: 'About',
    detailCta: 'See the full career and project details on my portfolio',
    site: 'Website',
    contribution: 'Contribution',
    achievements: 'Achievements',
  },
} as const;
