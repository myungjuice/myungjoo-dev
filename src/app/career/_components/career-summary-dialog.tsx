'use client';

import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { careerFilterList, careerMockData } from '@/constants/career';
import { useCareerPageStore } from '@/store/use-career-page-store';

import CareerSummaryCompany from './career-summary-company';

const CareerSummaryDialog = () => {
  const selectedFilter = useCareerPageStore(state => state.selectedFilter);
  const {
    i18n: { language },
  } = useTranslation();
  const languageKey = language === 'en' ? 'en' : 'ko';
  const filters = selectedFilter.length > 0 ? selectedFilter : careerFilterList;
  const companies = careerFilterList
    .filter(id => filters.includes(id))
    .map(id => careerMockData[languageKey][id]);
  const labels =
    languageKey === 'ko'
      ? {
          close: '닫기',
          count: `선택된 경력 ${companies.length}개`,
          summaryCount: `경력 ${companies.length}개`,
          title: '경력 요약',
          trigger: '한 화면으로 보기',
        }
      : {
          close: 'Close',
          count: `${companies.length} selected careers`,
          summaryCount: `${companies.length} careers`,
          title: 'Career Summary',
          trigger: 'View in one screen',
        };

  return (
    <Dialog>
      <div className='flex items-center justify-between gap-4 rounded-lg bg-slate-100 px-4 py-3 dark:bg-slate-800'>
        <p className='text-body-sm-bold'>{labels.summaryCount}</p>
        <DialogTrigger className='cursor-pointer rounded-md text-body-sm-bold text-teal-600 hover:text-teal-700 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none dark:text-teal-400 dark:hover:text-teal-300'>
          {labels.trigger}
        </DialogTrigger>
      </div>

      <DialogContent closeLabel={labels.close} className='max-h-[calc(100vh-2rem)]'>
        <DialogHeader>
          <DialogTitle className='text-heading-h5'>{labels.title}</DialogTitle>
          <DialogDescription className='text-body-sm text-slate-600 dark:text-slate-400'>
            {labels.count}
          </DialogDescription>
        </DialogHeader>
        <div className='max-h-[calc(100vh-12rem)] space-y-8 overflow-y-auto px-6 pb-6'>
          {companies.map(company => (
            <div
              key={company.id}
              data-testid='career-summary-company'
              className='border-b border-slate-200 pb-8 last:border-b-0 last:pb-0 dark:border-slate-700'
            >
              <CareerSummaryCompany company={company} language={languageKey} />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CareerSummaryDialog;
