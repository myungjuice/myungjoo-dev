import { CgProfile } from 'react-icons/cg';
import { MdWork, MdSportsEsports } from 'react-icons/md';

import type { AboutTabKey, Menu, TabIconMap } from '@/types/about';

export const initialTab: AboutTabKey = 'professional';

export const initialMenu: Menu = 'experience';

export const tabIconMap: TabIconMap = {
  professional: MdWork,
  personal: CgProfile,
  hobbies: MdSportsEsports,
};
