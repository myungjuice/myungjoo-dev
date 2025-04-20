'use client';

import Divider from '@/components/shared/divider';
import SectionTitle from '@/components/shared/section-title';
import SideContent from '@/components/shared/side-content';
import Sidebar from '@/components/sidebar';
import { useAboutPageStore } from '@/store/use-about-page-store';

import MainContent from './_components/main-content';
import SidebarContent from './_components/sidebar-content';

const Career = () => {
  const { selectedMenu } = useAboutPageStore(state => ({
    selectedMenu: state.selectedMenu,
  }));

  return (
    <div className='flex flex-col lg:h-full lg:flex-row'>
      <Sidebar size='md'>
        <Sidebar.Container desktopTitle='career'>
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

export default Career;
