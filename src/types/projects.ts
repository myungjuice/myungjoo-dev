import type { IconType } from 'react-icons';

import type { Language } from '@/types/language';

export type TechIconMap = Record<string, IconType>;

export type FetchProjectParams = {
  lang: Language;
  tech: string[];
};

export type FetchProjectItem = {
  id: string;
  key: string;
  lang: Language;
  title: string;
  language: string;
  tech_stack: string[];
  thumbnail_url: string;
  description: string;
  github_url: string;
  site_url: string;
  displayOrder: number;
  startDate: string;
  endDate: string;
};
