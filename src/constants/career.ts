import { ko, en } from '@/lib/i18n/career.json';
import type { CareerFilterItem } from '@/types/career';

export const CareerFilterList: CareerFilterItem[] = ['supertree', 'd.dive', 'ellen'];

export const careerMockData = {
  ko,
  en,
};

export const careerKoMap: Record<CareerFilterItem, string> = {
  supertree: '수퍼트리',
  'd.dive': '디다이브',
  ellen: '엘렌',
};
