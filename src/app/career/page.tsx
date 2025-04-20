'use client';

import Divider from '@/components/shared/divider';
import SectionTitle from '@/components/shared/section-title';
import SideContent from '@/components/shared/side-content';
import Sidebar from '@/components/sidebar';
import { useCareerPageStore } from '@/store/use-career-page-store';
import type { CareerFilterItem } from '@/types/career';

import MainContent from './_components/main-content';
import SidebarContent from './_components/sidebar-content';

const Career = () => {
  const { selectedFilter, toggleFilter } = useCareerPageStore(state => ({
    selectedFilter: state.selectedFilter,
    toggleFilter: state.toggleFilter,
  }));

  const handleClick = (text?: string) => {
    if (!text) return;
    toggleFilter(text as CareerFilterItem);
  };

  return (
    <div className='flex flex-col lg:h-full lg:flex-row'>
      <Sidebar size='md'>
        <Sidebar.Container desktopTitle='_career'>
          <SidebarContent />
        </Sidebar.Container>
      </Sidebar>

      <div className='flex h-full flex-1 flex-col'>
        <SectionTitle>
          {selectedFilter.map(filter => (
            <SectionTitle.Item key={filter} onClose={handleClick}>
              {filter}
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

export default Career;
