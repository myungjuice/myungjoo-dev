'use client';

import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Divider from '@/components/shared/divider';
import ErrorContent from '@/components/shared/error-content';
import SectionTitle from '@/components/shared/section-title';
import SideContent from '@/components/shared/side-content';
import Sidebar from '@/components/sidebar';
import useMounted from '@/hooks/use-mounted';
import { fetchCareer } from '@/lib/api/career';
import { useCareerPageStore } from '@/store/use-career-page-store';
import type { CareerFilterItem, FetchCareerItem, CareerName } from '@/types/career';
import type { Language } from '@/types/language';

import MainContent from './main-content';
import SidebarContent from './sidebar-content';

type Props = {
  initialLang: Language;
  initialData: FetchCareerItem[];
  initialKeys: CareerFilterItem[];
  initialCareerNames: CareerName[];
};

const Career = ({ initialLang, initialData, initialKeys, initialCareerNames }: Props) => {
  const { selectedFilter, setInitialKeys, setCareerNames, toggleFilter } = useCareerPageStore(
    state => ({
      selectedFilter: state.selectedFilter,
      setInitialKeys: state.setInitialKeys,
      setCareerNames: state.setCareerNames,
      toggleFilter: state.toggleFilter,
    })
  );

  const {
    i18n: { language },
  } = useTranslation();

  const isMounted = useMounted();

  const { data, isFetching, isError } = useQuery<FetchCareerItem[]>({
    queryKey: ['career', language, selectedFilter],
    queryFn: () => fetchCareer({ lang: language as Language, key: selectedFilter }),
    initialData,
    enabled:
      language !== initialLang || (isMounted && selectedFilter.length !== initialKeys.length),
    refetchOnMount: process.env.NODE_ENV === 'development',
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const handleClick = useCallback(
    (text?: string) => {
      if (!text) return;

      const findKey = initialCareerNames.find(
        item => item.name[language as Language] === text
      )?.key;
      if (!findKey) return;

      toggleFilter(findKey);
    },
    [language, initialCareerNames, toggleFilter]
  );

  useEffect(() => {
    if (!isMounted) {
      setCareerNames(initialCareerNames);
      setInitialKeys(initialKeys);
    }
  }, [isMounted, initialKeys, initialCareerNames, setCareerNames, setInitialKeys]);

  if (isError) return <ErrorContent />;

  return (
    <div className='relative flex flex-col lg:h-full lg:flex-row'>
      {isFetching && <div className='absolute inset-0 z-20 flex h-full w-full bg-black/0' />}
      <Sidebar>
        <Sidebar.Container desktopTitle={language === 'ko' ? '경력' : 'career'}>
          <SidebarContent />
        </Sidebar.Container>
      </Sidebar>
      <div className='flex h-full flex-1 flex-col'>
        <SectionTitle>
          {selectedFilter.map(filter => {
            const title = initialCareerNames.find(item => item.key === filter)?.name[
              language as Language
            ];

            return (
              <SectionTitle.Item key={filter} onClose={handleClick}>
                {title}
              </SectionTitle.Item>
            );
          })}
        </SectionTitle>

        <div className='flex h-full flex-col 2xl:flex-row'>
          <MainContent data={data} isFetching={isFetching} />
          <Divider />
          <SideContent />
          <Divider />
        </div>
      </div>
    </div>
  );
};

export default Career;
