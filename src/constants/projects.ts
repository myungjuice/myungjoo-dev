import { SiReact } from 'react-icons/si';

import projectsI18n from '@/lib/i18n/projects';
import type { Tech, TechIconMap, ProjectTranslations } from '@/types/projects';

export const techList: Tech[] = ['react'];

export const techIconMap: TechIconMap = {
  react: SiReact,
};

export const techKoMap: Record<Tech, string> = {
  react: '리액트',
};

export const projectsMockData = projectsI18n as ProjectTranslations;
