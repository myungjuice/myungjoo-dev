export type CareerFilterItem = 'cdri' | 'ellen' | 'd.dive' | 'supertree';

export type CaseStudy = {
  context?: string;
  problem?: string;
  action?: string[];
  impact?: string[];
  reflection?: string;
};

export type CareerProject = {
  id: number;
  title: string;
  period?: string;
  description: string;
  caseStudy?: CaseStudy;
};

export type CareerCompany = {
  id: CareerFilterItem;
  name: string;
  period: string;
  slogan?: string;
  role: string;
  tags?: string[];
  logoUrl?: string;
  imageClassName?: string;
  projects: CareerProject[];
};
