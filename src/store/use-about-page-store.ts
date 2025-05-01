import { useShallow } from 'zustand/react/shallow';

import { initialTab, initialMenu } from '@/constants/about';
import type { AboutTabKey, Menu } from '@/types/about';

import { createStore } from '.';

type AboutPageStore = {
  selectedTab: AboutTabKey;
  selectedMenu: Menu;
  setTab: (section: AboutTabKey, initialMenu: Menu) => void;
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
    setTab: (tab, initialMenu) => {
      set({
        selectedTab: tab,
        selectedMenu: initialMenu,
      });
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
