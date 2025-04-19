import { CgProfile } from 'react-icons/cg';
import { MdWork, MdSportsEsports } from 'react-icons/md';

import type { AboutPageData, AboutTabKey, Menu } from '@/types/about';

import {
  experience,
  hardSkills,
  softSkills,
  bio,
  interests,
  education,
  highSchool,
  university,
  sports,
  favoriteGames,
  favoriteFoods,
} from './main-content';

export const initialTab: AboutTabKey = 'professional';

export const initialMenu: Menu = 'experience';

export const aboutPageData: AboutPageData = {
  professional: {
    icon: MdWork,
    menu: {
      experience,
      'hard-skills': hardSkills,
      'soft-skills': softSkills,
    },
  },
  personal: {
    icon: CgProfile,
    menu: {
      bio,
      interests,
      education,
      'high-school': highSchool,
      university,
    },
  },
  hobbies: {
    icon: MdSportsEsports,
    menu: {
      sports,
      'favorite-games': favoriteGames,
      'favorite-foods': favoriteFoods,
    },
  },
};
