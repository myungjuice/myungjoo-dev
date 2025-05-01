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

export type TabIconMap = Record<AboutTabKey, IconType>;

type AboutCategoryType = 'tab' | 'menu';

export type FetchAboutCategoryParams = {
  lang: Language;
};

export type AboutCategoryItem = {
  id: string;
  type: AboutCategoryType;
  key: AboutTabKey | Menu;
  name: string;
  menus: Menu[];
};

export type FetchAboutParams = {
  lang: Language;
  tabKey: AboutTabKey;
  menuKey: Menu;
};

export type AboutResponse = {
  id: string;
  tabKey: AboutTabKey;
  menuKey: Menu;
  content: string;
  content_ko: string;
  content_en: string;
};
