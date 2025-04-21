import { SiReact, SiPython } from 'react-icons/si';

import projectsI18n from '@/lib/i18n/projects.json';
import type { Tech, TechIconMap, ProjectTranslations } from '@/types/projects';

export const techList: TechIconMap = {
  react: SiReact,
  python: SiPython,
};

export const techKoMap: Record<Tech, string> = {
  react: '리액트',
  python: '파이썬',
};

export const projectsMockData = projectsI18n as ProjectTranslations;
