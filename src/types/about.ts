import type { IconType } from 'react-icons';

import type { Language } from './language';

export type AboutTabKey = 'professional' | 'personal' | 'hobbies';
export type Menu =
  | 'experience'
  | 'hard-skills'
  | 'soft-skills'
  | 'bio'
  | 'interests'
  | 'education'
  | 'sports'
  | 'favorite-games'
  | 'favorite-foods';

type AboutMenuMap = Partial<Record<Menu, string>>;

type AboutSection = {
  icon: IconType;
  menu: AboutMenuMap;
};

export type AboutPageData = Record<AboutTabKey, AboutSection>;

export type TabIconMap = Record<AboutTabKey, IconType>;

type AboutCategoryType = 'tab' | 'menu';

export type FetchAboutCategoryParams = {
  lang: Language;
};

export type AboutCategoryItem = {
  id: string;
  type: AboutCategoryType;
  key: AboutTabKey;
  name: string;
  menus: Menu[];
};
