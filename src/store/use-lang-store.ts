import { useShallow } from 'zustand/react/shallow';

import i18n from '@/lib/i18n/client';

import { createStore } from '.';

type Language = 'ko' | 'en';

type LangStore = {
  lang: Language;
  setLang: (lang: Language) => void;
};

const initialState = {
  lang: 'ko' as Language,
};

export const langStore = createStore<LangStore>(
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

export const useLangStore = <T>(selector: (state: LangStore) => T): T =>
  langStore(useShallow(selector));
