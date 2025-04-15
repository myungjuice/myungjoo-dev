import i18next, { use as i18nextUse } from 'i18next';
import { initReactI18next } from 'react-i18next';

import error from './error.json';
import main from './main.json';
import notFound from './not-found.json';

i18nextUse.call(i18next, initReactI18next).init({
  fallbackLng: 'ko',
  supportedLngs: ['ko', 'en'],
  lng: 'ko',
  ns: ['main'],
  defaultNS: 'main',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    ko: {
      main: main.ko,
      'not-found': notFound.ko,
      error: error.ko,
    },
    en: {
      main: main.en,
      'not-found': notFound.en,
      error: error.en,
    },
  },
});

export default i18next;
