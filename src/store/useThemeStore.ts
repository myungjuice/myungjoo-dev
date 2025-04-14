import { createStore } from '.';

interface Store {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDarkMode: boolean) => void;
}

const initialState = {
  isDarkMode: false,
};

export const useThemeStore = createStore<Store>(
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
