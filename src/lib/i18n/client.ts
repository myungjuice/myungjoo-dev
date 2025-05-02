import i18next, { use as i18nextUse } from 'i18next';
import { initReactI18next } from 'react-i18next';

import about from './about';
import career from './career.json';
import error from './error.json';
import header from './header.json';
import main from './main.json';
import notFound from './not-found.json';
import snake from './snake.json';

i18nextUse.call(i18next, initReactI18next).init({
  fallbackLng: 'ko',
  supportedLngs: ['ko', 'en'],
  lng: 'ko',
  ns: ['main', 'not-found', 'error', 'header', 'snake', 'about', 'career', 'project'],
  defaultNS: 'main',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    ko: {
      error: error.ko,
      header: header.ko,
      main: main.ko,
      'not-found': notFound.ko,
      snake: snake.ko,
      about: about.ko,
      career: career.ko,
    },
    en: {
      error: error.en,
      header: header.en,
      main: main.en,
      'not-found': notFound.en,
      snake: snake.en,
      about: about.en,
      career: career.en,
    },
  },
});

export default i18next;
