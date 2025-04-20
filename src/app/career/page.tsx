'use client';

import Divider from '@/components/shared/divider';
import SectionTitle from '@/components/shared/section-title';
import SideContent from '@/components/shared/side-content';
import Sidebar from '@/components/sidebar';
import { navLinks } from '@/constants/header';
import { useAboutPageStore } from '@/store/use-about-page-store';

import MainContent from './_components/main-content';

const pageTitle = navLinks.find(item => item.href === '/about')?.label || '_about-me';

const Career = () => {
  const { selectedMenu } = useAboutPageStore(state => ({
    selectedMenu: state.selectedMenu,
  }));

  return (
    <div className='flex flex-col lg:h-full lg:flex-row'>
      <Sidebar>
        <Sidebar.Container pageTitle={pageTitle}>
          <div>SidebarContent</div>
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

export default Career;
