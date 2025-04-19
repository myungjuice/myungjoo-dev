import { CgProfile } from 'react-icons/cg';
import { MdWork, MdSportsEsports } from 'react-icons/md';

import type { AboutPageData, AboutTabKey, Menu } from '@/types/about';

export const initialTab: AboutTabKey = 'professional';

export const initialMenu: Menu = 'experience';

export const aboutPageData: AboutPageData = {
  professional: {
    icon: MdWork,
    menu: {
      experience: 'experience 내용',
      'hard-skills': 'hard-skills 내용',
      'soft-skills': 'soft-skills 내용',
    },
  },
  personal: {
    icon: CgProfile,
    menu: {
      bio: 'bio 내용',
      interests: 'interests 내용',
      education: 'education 내용',
      'high-school': 'high-school 내용',
      university: 'university 내용',
    },
  },
  hobbies: {
    icon: MdSportsEsports,
    menu: {
      sports: 'sports 내용',
      'favorite-games': 'favorite-games 내용',
      'favorite-foods': 'favorite-foods 내용',
    },
  },
};
