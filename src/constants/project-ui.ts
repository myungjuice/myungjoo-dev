import { SiReact } from 'react-icons/si';

import type { Tech, TechIconMap } from '@/types/projects';

export const techList: Tech[] = ['react'];

export const techIconMap: TechIconMap = {
  react: SiReact,
};

export const techKoMap: Record<Tech, string> = {
  react: '리액트',
};
