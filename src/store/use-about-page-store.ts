import { useShallow } from 'zustand/react/shallow';

import { initialTab, initialMenu, aboutPageData } from '@/constants/about';
import type { AboutTabKey, Menu } from '@/types/about';

import { createStore } from '.';

type AboutPageStore = {
  selectedTab: AboutTabKey;
  selectedMenu: Menu;
  setTab: (section: AboutTabKey) => void;
  setMenu: (menu: Menu) => void;
  reset: () => void;
};

const initialState = {
  selectedTab: initialTab,
  selectedMenu: initialMenu,
};

export const aboutPageStore = createStore<AboutPageStore>(
  set => ({
    ...initialState,
    setTab: tab => {
      const firstMenuKey = Object.keys(aboutPageData[tab].menu)[0] as Menu;
      set({ selectedTab: tab, selectedMenu: firstMenuKey });
    },
    setMenu: menu => {
      set({ selectedMenu: menu });
    },
    reset: () => set({ ...initialState }),
  }),
  'aboutPageStore',
  false
);

export const useAboutPageStore = <T>(selector: (state: AboutPageStore) => T): T =>
  aboutPageStore(useShallow(selector));
