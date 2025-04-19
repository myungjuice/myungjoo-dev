'use client';

import SectionTitle from '@/components/shared/section-title';
import Sidebar from '@/components/sidebar';
import { navLinks } from '@/constants/header';
import { useAboutPageStore } from '@/store/use-about-page-store';

import Divider from './_components/divider';
import MainContent from './_components/main-content';
import SideContent from './_components/side-content';
import SidebarContent from './_components/sidebar-content';

const pageTitle = navLinks.find(item => item.href === '/about')?.label || '_about-me';

const About = () => {
  const { selectedMenu } = useAboutPageStore(state => ({
    selectedMenu: state.selectedMenu,
  }));

  return (
    <div className='flex flex-col lg:h-full lg:flex-row'>
      <Sidebar>
        <Sidebar.Tab />
        <Sidebar.Container pageTitle={pageTitle}>
          <SidebarContent />
        </Sidebar.Container>
      </Sidebar>

      <div className='flex h-full flex-1 flex-col'>
        <SectionTitle text={selectedMenu} />
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
