'use client';

import SectionTitle from '@/components/shared/section-title';
import Sidebar from '@/components/sidebar';
import { navLinks } from '@/constants/header';
import { useAboutPageStore } from '@/store/use-about-page-store';

import SidebarContent from './_components/sidebar-content';

const pageTitle = navLinks.find(item => item.href === '/about')?.label || '_about-me';

const About = () => {
  const { selectedTab, selectedMenu, setTab } = useAboutPageStore(state => ({
    selectedTab: state.selectedTab,
    selectedMenu: state.selectedMenu,
    setTab: state.setTab,
  }));

  const handleTabClick = () => {
    setTab('personal');
  };

  return (
    <div className='flex flex-col lg:h-full lg:flex-row'>
      <Sidebar>
        <Sidebar.Tab />
        <Sidebar.Content pageTitle={pageTitle}>
          <SidebarContent />
        </Sidebar.Content>
      </Sidebar>

      <div className='flex h-full flex-1 flex-col'>
        <SectionTitle text={selectedMenu} />
        <div className='flex h-full flex-col lg:flex-row'>
          <div className='flex-1 p-6'>
            <p>중앙 컨텐츠</p>
            <p>selectedTab: {selectedTab}</p>
            <p>selectedMenu: {selectedMenu}</p>
            <button onClick={handleTabClick}>setTab</button>
          </div>
          <div className='hidden h-full w-10 justify-center border-r border-l border-slate-400 py-4 lg:flex dark:border-slate-700'>
            <div className='h-2 w-6 bg-slate-500' />
          </div>
          <div className='flex-1 p-6'>우측 컨텐츠</div>
        </div>
      </div>
    </div>
  );
};

export default About;
