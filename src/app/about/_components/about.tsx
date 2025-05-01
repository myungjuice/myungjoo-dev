'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Divider from '@/components/shared/divider';
import ErrorContent from '@/components/shared/error-content';
import SectionTitle from '@/components/shared/section-title';
import SideContent from '@/components/shared/side-content';
import Sidebar from '@/components/sidebar';
import { navLinks } from '@/constants/header';
import { fetchAboutCategory, fetchAbout } from '@/lib/api/about';
import { useAboutPageStore } from '@/store/use-about-page-store';
import type { AboutCategoryItem, AboutResponse } from '@/types/about';
import type { Language } from '@/types/language';

import MainContent from './main-content';
import SidebarContent from './sidebar-content';

type Props = {
  initialCategoryData: AboutCategoryItem[];
  initialData: AboutResponse;
  initialLang: Language;
};

const mobileTitle = navLinks.find(item => item.href === '/about')?.label || '_about-me';

const About = ({ initialCategoryData, initialData, initialLang }: Props) => {
  const { selectedMenu, selectedTab } = useAboutPageStore(state => ({
    selectedMenu: state.selectedMenu,
    selectedTab: state.selectedTab,
  }));

  const {
    i18n: { language },
  } = useTranslation();

  const { data: categoryAboutData } = useQuery<AboutCategoryItem[]>({
    queryKey: ['about-category', language],
    queryFn: () => fetchAboutCategory({ lang: language as Language }),
    initialData: initialCategoryData,
    enabled: language !== initialLang,
    refetchOnMount: process.env.NODE_ENV === 'development',
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const tabs = useMemo(
    () => categoryAboutData?.filter(item => item.type === 'tab') || [],
    [categoryAboutData]
  );

  const { selectedTabName, selectedMenuName } = useMemo(() => {
    const selectedTabName = tabs.find(tab => tab.key === selectedTab)?.name || '';
    const selectedMenuName =
      categoryAboutData.find(category => category.key === selectedMenu)?.name || '';
    return { selectedTabName, selectedMenuName };
  }, [tabs, selectedTab, selectedMenu, categoryAboutData]);

  const { data, isFetching, isError } = useQuery({
    queryKey: ['about', language, selectedTab, selectedMenu],
    queryFn: () =>
      fetchAbout({ lang: language as Language, tabKey: selectedTab, menuKey: selectedMenu }),
    initialData,
    enabled:
      language !== initialLang ||
      selectedTab !== initialData.tabKey ||
      selectedMenu !== initialData.menuKey,
    refetchOnMount: process.env.NODE_ENV === 'development',
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  if (isError) return <ErrorContent />;

  return (
    <div className='relative flex flex-col lg:h-full lg:flex-row'>
      {isFetching && <div className='absolute inset-0 z-20 flex h-full w-full bg-black/0' />}

      <Sidebar>
        <Sidebar.Tab tabs={tabs} />
        <Sidebar.Container mobileTitle={mobileTitle} desktopTitle={selectedTabName}>
          <SidebarContent tabs={tabs} categoryAboutData={categoryAboutData} />
        </Sidebar.Container>
      </Sidebar>

      <div className='flex h-full flex-1 flex-col'>
        <SectionTitle className='h-[59px]'>
          <SectionTitle.Item>{selectedMenuName}</SectionTitle.Item>
        </SectionTitle>

        <div className='flex h-full flex-col 2xl:flex-row'>
          <MainContent
            contents={language === 'ko' ? data.content_ko : data.content_en}
            isFetching={isFetching}
          />
          <Divider />
          <SideContent />
          <Divider />
        </div>
      </div>
    </div>
  );
};

export default About;
