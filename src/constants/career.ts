import careerI18n from '@/lib/i18n/career.json';
import type { CareerCompany, CareerFilterItem } from '@/types/career';

export const careerFilterList: CareerFilterItem[] = ['cdri', 'supertree', 'd.dive', 'ellen'];

export const careerMockData: Record<'ko' | 'en', Record<CareerFilterItem, CareerCompany>> = {
  ko: careerI18n.ko as unknown as Record<CareerFilterItem, CareerCompany>,
  en: careerI18n.en as unknown as Record<CareerFilterItem, CareerCompany>,
};

export const careerKoMap: Record<CareerFilterItem, string> = {
  cdri: '씨디알아이',
  supertree: '수퍼트리',
  'd.dive': '디다이브',
  ellen: '엘렌',
};
