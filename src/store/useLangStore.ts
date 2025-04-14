import i18n from '@/lib/i18n/client';

import { createStore } from '.';

type Language = 'ko' | 'en';

export interface LangStore {
  lang: Language;
  setLang: (lang: Language) => void;
}

const initialState = {
  lang: 'ko' as Language,
};

export const useLangStore = createStore<LangStore>(
  set => ({
    ...initialState,
    setLang: lang => {
      i18n.changeLanguage(lang);
      set({ lang });
    },
  }),
  'langStore',
  true
);
