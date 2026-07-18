import type { CareerFilterItem, CareerProject, CaseStudy } from '@/types/career';

export type ResumePdfTemplate = 'A' | 'C';
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
  projects: Array<CareerProject & { href: string; caseStudy?: CaseStudy }>;
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
  labels: {
    skills: string;
    careers: string;
    projects: string;
    intro: string;
    detailCta: string;
    site: string;
    contribution: string;
    achievements: string;
  };
  baseUrl: string;
};
