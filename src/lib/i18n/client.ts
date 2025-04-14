import i18next, { use as i18nextUse } from 'i18next';
import { initReactI18next } from 'react-i18next';

i18nextUse.call(i18next, initReactI18next).init({
  fallbackLng: 'ko',
  supportedLngs: ['ko', 'en'],
  lng: 'ko',
  ns: ['home'],
  defaultNS: 'home',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    ko: {
      home: {
        zustandSectionTitle: 'Zustand 카운터',
        designSystemSectionTitle: 'Tailwind CSS 디자인 시스템',
        shadcnButtonSectionTitle: 'Shadcn UI - 버튼',
        shadcnDropdownSectionTitle: 'Shadcn UI - 드롭다운',
        shadcnInputSectionTitle: 'Shadcn UI - 인풋',
        shadcnTableSectionTitle: 'Shadcn UI - 테이블',
        resetButtonText: '초기화',
      },
    },
    en: {
      home: {
        zustandSectionTitle: 'Zustand Counter',
        designSystemSectionTitle: 'Tailwind CSS Design System',
        shadcnButtonSectionTitle: 'Shadcn UI - Button Samples',
        shadcnDropdownSectionTitle: 'Shadcn UI - Dropdown',
        shadcnInputSectionTitle: 'Shadcn UI - Input',
        shadcnTableSectionTitle: 'Shadcn UI - Table',
        resetButtonText: 'Reset',
      },
    },
  },
});

export default i18next;
