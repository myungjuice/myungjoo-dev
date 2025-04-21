import careerI18n from '@/lib/i18n/career.json';
import type { CareerFilterItem } from '@/types/career';

export const careerFilterList: CareerFilterItem[] = ['supertree', 'd.dive', 'ellen'];

export const careerMockData = {
  ko: careerI18n.ko,
  en: careerI18n.en,
};

export const careerKoMap: Record<CareerFilterItem, string> = {
  supertree: '수퍼트리',
  'd.dive': '디다이브',
  ellen: '엘렌',
};
