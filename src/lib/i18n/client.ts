import i18next, { use as i18nextUse } from 'i18next';
import { initReactI18next } from 'react-i18next';

import error from './error.json';
import header from './header.json';
import notFound from './not-found.json';

i18nextUse.call(i18next, initReactI18next).init({
  fallbackLng: 'ko',
  supportedLngs: ['ko', 'en'],
  lng: 'ko',
  ns: ['not-found', 'error', 'header'],
  defaultNS: 'header',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    ko: {
      'not-found': notFound.ko,
      error: error.ko,
      header: header.ko,
    },
    en: {
      'not-found': notFound.en,
      error: error.en,
      header: header.en,
    },
  },
});

export default i18next;
