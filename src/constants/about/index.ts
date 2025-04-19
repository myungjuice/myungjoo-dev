import { CgProfile } from 'react-icons/cg';
import { MdWork, MdSportsEsports } from 'react-icons/md';

import i18n from '@/lib/i18n/client';
import type { AboutPageData, AboutTabKey, Menu } from '@/types/about';

export const initialTab: AboutTabKey = 'professional';

export const initialMenu: Menu = 'experience';

export const getAboutPageData = (): AboutPageData => ({
  professional: {
    icon: MdWork,
    menu: {
      experience: i18n.t('about:experience'),
      'hard-skills': i18n.t('about:hard-skills'),
      'soft-skills': i18n.t('about:soft-skills'),
    },
  },
  personal: {
    icon: CgProfile,
    menu: {
      bio: i18n.t('about:bio'),
      interests: i18n.t('about:interests'),
      education: i18n.t('about:education'),
      'high-school': i18n.t('about:high-school'),
      university: i18n.t('about:university'),
    },
  },
  hobbies: {
    icon: MdSportsEsports,
    menu: {
      sports: i18n.t('about:sports'),
      'favorite-games': i18n.t('about:favorite-games'),
      'favorite-foods': i18n.t('about:favorite-foods'),
    },
  },
});

export const aboutTabKoMap: Record<AboutTabKey, string> = {
  professional: '경력',
  personal: '개인',
  hobbies: '취미',
};

export const aboutMenuKoMap: Record<Menu, string> = {
  experience: '직무 경험',
  'hard-skills': '기술 역량',
  'soft-skills': '대인 역량',
  bio: '자기소개',
  interests: '관심사',
  education: '학력',
  'high-school': '고등학교',
  university: '대학교',
  sports: '운동',
  'favorite-games': '좋아하는 게임',
  'favorite-foods': '좋아하는 음식',
};
