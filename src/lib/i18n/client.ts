import i18next, { use as i18nextUse } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import ko from './ko.json';

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
    ko,
    en,
  },
});

export default i18next;
