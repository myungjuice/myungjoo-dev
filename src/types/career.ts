import type { Language } from '@/types/language';

export type CareerFilterItem = 'ellen' | 'ddive' | 'supertree';

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

export type FetchCareerParams = {
  lang: Language;
  key?: (CareerFilterItem | 'all')[];
};

type CareerProjectItem = {
  id: string;
  title: string;
  description: string;
};

export type FetchCareerItem = {
  id: string;
  key: CareerFilterItem;
  lang: Language;
  name: Record<Language, string>;
  slogan: string;
  role: string;
  logoUrl: string;
  startDate: string;
  endDate: string;
  projects: CareerProjectItem[];
};

type CareerNameLanguageMap = Record<Language, string>;

export type CareerName = {
  key: CareerFilterItem;
  name: CareerNameLanguageMap;
};

export type CompanyImageClassMap = Record<CareerFilterItem, string>;
