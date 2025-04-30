'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import Divider from '@/components/shared/divider';
import ErrorContent from '@/components/shared/error-content';
import SectionTitle from '@/components/shared/section-title';
import SideContent from '@/components/shared/side-content';
import Sidebar from '@/components/sidebar';
import { aboutTabKoMap, aboutMenuKoMap } from '@/constants/about';
import { navLinks } from '@/constants/header';
import { fetchAbout } from '@/lib/api/about';
import { useAboutPageStore } from '@/store/use-about-page-store';
import type { Menu, AboutCategoryItem, AboutResponse } from '@/types/about';
import type { Language } from '@/types/language';

import MainContent from './main-content';
import SidebarContent from './sidebar-content';

type Props = {
  tabs: AboutCategoryItem[];
  initialData: AboutResponse;
  initialLang: Language;
};

const mobileTitle = navLinks.find(item => item.href === '/about')?.label || '_about-me';

const About = ({ tabs, initialData, initialLang }: Props) => {
  const { selectedMenu, selectedTab } = useAboutPageStore(state => ({
    selectedMenu: state.selectedMenu,
    selectedTab: state.selectedTab,
  }));

  const {
    i18n: { language },
  } = useTranslation();

  const { data, isFetching, isError } = useQuery({
    queryKey: ['hello', language, selectedTab, selectedMenu],
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

  if (isError) {
    return <ErrorContent />;
  }

  return (
    <div className='flex flex-col lg:h-full lg:flex-row'>
      <Sidebar>
        <Sidebar.Tab tabs={tabs} />
        <Sidebar.Container
          mobileTitle={mobileTitle}
          desktopTitle={language === 'ko' ? aboutTabKoMap[selectedTab] : selectedTab}
        >
          <SidebarContent tabs={tabs} />
        </Sidebar.Container>
      </Sidebar>

      <div className='flex h-full flex-1 flex-col'>
        <SectionTitle className='h-[59px]'>
          <SectionTitle.Item>
            {language === 'ko' ? aboutMenuKoMap[selectedMenu as Menu] : selectedMenu}
          </SectionTitle.Item>
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
