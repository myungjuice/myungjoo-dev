import { createStore } from '.';

interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const initialState = {
  isDarkMode: false,
};

export const useThemeStore = createStore<ThemeState>(
  set => ({
    ...initialState,
    toggleDarkMode: () => set(state => ({ isDarkMode: !state.isDarkMode })),
  }),
  'themeStore',
  true
);
