'use client';

import { useTranslation } from 'react-i18next';

import Divider from '@/components/shared/divider';
import SectionTitle from '@/components/shared/section-title';
import SideContent from '@/components/shared/side-content';
import Sidebar from '@/components/sidebar';
import { aboutTabKoMap, aboutMenuKoMap } from '@/constants/about';
import { navLinks } from '@/constants/header';
import { useAboutPageStore } from '@/store/use-about-page-store';
import type { Menu } from '@/types/about';

import MainContent from './_components/main-content';
import SidebarContent from './_components/sidebar-content';

const mobileTitle = navLinks.find(item => item.href === '/about')?.label || '_about-me';

const About = () => {
  const { selectedMenu, selectedTab } = useAboutPageStore(state => ({
    selectedMenu: state.selectedMenu,
    selectedTab: state.selectedTab,
  }));

  const {
    i18n: { language },
  } = useTranslation();

  return (
    <div className='flex flex-col lg:h-full lg:flex-row'>
      <Sidebar>
        <Sidebar.Tab />
        <Sidebar.Container
          mobileTitle={mobileTitle}
          desktopTitle={language === 'ko' ? aboutTabKoMap[selectedTab] : selectedTab}
        >
          <SidebarContent />
        </Sidebar.Container>
      </Sidebar>

      <div className='flex h-full flex-1 flex-col'>
        <SectionTitle>
          <SectionTitle.Item>
            {language === 'ko' ? aboutMenuKoMap[selectedMenu as Menu] : selectedMenu}
          </SectionTitle.Item>
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

export default About;
