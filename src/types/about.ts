import { type IconType } from 'react-icons';

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
  lang: string;
};

export type AboutCategory = {
  id: string;
  type: AboutCategoryType;
  key: AboutTabKey;
  name: string;
  menus: Menu[];
};
