'use client';

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Divider from '@/components/shared/divider';
import SectionTitle from '@/components/shared/section-title';
import SideContent from '@/components/shared/side-content';
import Sidebar from '@/components/sidebar';
import { careerKoMap } from '@/constants/career';
import { getMappedKey } from '@/lib/utils';
import { useCareerPageStore } from '@/store/use-career-page-store';
import type { CareerFilterItem } from '@/types/career';

import MainContent from './_components/main-content';
import SidebarContent from './_components/sidebar-content';

const CareerPage = () => {
  const { selectedFilter, toggleFilter } = useCareerPageStore(state => ({
    selectedFilter: state.selectedFilter,
    toggleFilter: state.toggleFilter,
  }));

  const {
    i18n: { language },
  } = useTranslation();

  const handleClick = useCallback(
    (text?: string) => {
      if (!text) return;

      const key =
        language === 'ko'
          ? getMappedKey<CareerFilterItem>(careerKoMap, text)
          : (text as CareerFilterItem);
      if (!key) return;

      toggleFilter(key);
    },
    [language, toggleFilter]
  );

  return (
    <div className='flex flex-col lg:h-full lg:flex-row'>
      <Sidebar size='md'>
        <Sidebar.Container desktopTitle={language === 'ko' ? '경력' : 'career'}>
          <SidebarContent />
        </Sidebar.Container>
      </Sidebar>
      <div className='flex h-full flex-1 flex-col'>
        <SectionTitle>
          {selectedFilter.map(filter => (
            <SectionTitle.Item key={filter} onClose={handleClick}>
              {language === 'ko' ? careerKoMap[filter as CareerFilterItem] : filter}
            </SectionTitle.Item>
          ))}
        </SectionTitle>

        <div className='flex h-full flex-col 2xl:flex-row'>
          <MainContent />
          <Divider />
          <SideContent />
          <Divider />
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
