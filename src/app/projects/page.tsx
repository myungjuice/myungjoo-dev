'use client';

import { useTranslation } from 'react-i18next';

import Divider from '@/components/shared/divider';
import SectionTitle from '@/components/shared/section-title';
import SideContent from '@/components/shared/side-content';
import Sidebar from '@/components/sidebar';
import { techKoMap } from '@/constants/projects';
import { useProjectsPageStore } from '@/store/use-projects-page-store';
import type { Tech } from '@/types/projects';

import MainContent from './_components/main-content';
import SidebarContent from './_components/sidebar-content';

const ProjectPage = () => {
  const { selectedTechs, toggleTech } = useProjectsPageStore(state => ({
    selectedTechs: state.selectedTechs,
    toggleTech: state.toggleTech,
  }));

  const {
    i18n: { language },
  } = useTranslation();

  const handleClick = (text?: string) => {
    if (!text) return;
    toggleTech(text as Tech);
  };

  return (
    <div className='flex flex-col lg:h-full lg:flex-row'>
      <Sidebar size='md'>
        <Sidebar.Container desktopTitle={language === 'ko' ? '경력' : 'career'}>
          <SidebarContent />
        </Sidebar.Container>
      </Sidebar>
      <div className='flex h-full flex-1 flex-col'>
        <SectionTitle>
          {selectedTechs.map(filter => (
            <SectionTitle.Item key={filter} onClose={handleClick}>
              {language === 'ko' ? techKoMap[filter as Tech] : filter}
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

export default ProjectPage;
