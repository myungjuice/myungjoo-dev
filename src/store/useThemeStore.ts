import { useShallow } from 'zustand/react/shallow';

import { createStore } from '.';

interface ThemeStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDarkMode: boolean) => void;
}

const initialState = {
  isDarkMode: false,
};

export const themeStore = createStore<ThemeStore>(
  set => ({
    ...initialState,
    toggleDarkMode: () => set(state => ({ isDarkMode: !state.isDarkMode })),
    setDarkMode: isDarkMode => {
      set({ isDarkMode });
    },
  }),
  'themeStore',
  true
);

export const useThemeStore = <T>(selector: (state: ThemeStore) => T): T =>
  themeStore(useShallow(selector));
