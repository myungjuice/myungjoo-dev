export type CareerFilterItem = 'cdri' | 'ellen' | 'd.dive' | 'supertree';

export type CareerProject = {
  id: number;
  title: string;
  period: string;
  description: string;
};

export type CareerCompany = {
  id: CareerFilterItem;
  name: string;
  slogan?: string;
  role: string;
  tags?: string[];
  logoUrl?: string;
  imageClassName?: string;
  projects: CareerProject[];
};
