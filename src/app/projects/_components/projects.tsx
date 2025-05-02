'use client';

import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import ErrorContent from '@/components/shared/error-content';
import SectionTitle from '@/components/shared/section-title';
import Sidebar from '@/components/sidebar';
import useMounted from '@/hooks/use-mounted';
import { fetchProjects } from '@/lib/api/projects';
import { useProjectsPageStore } from '@/store/use-projects-page-store';
import type { Language } from '@/types/language';
import type { FetchProjectItem } from '@/types/projects';

import MainContent from './main-content';
import SidebarContent from './sidebar-content';

type Props = {
  initialLang: Language;
  initialData: FetchProjectItem[];
  initialTechs: string[];
};

const Project = ({ initialLang, initialData, initialTechs }: Props) => {
  const { selectedTechs, setTechs, toggleTech, setInitialTechs } = useProjectsPageStore(state => ({
    selectedTechs: state.selectedTechs,
    setTechs: state.setTechs,
    toggleTech: state.toggleTech,
    setInitialTechs: state.setInitialTechs,
  }));

  const {
    i18n: { language },
  } = useTranslation();

  const isMounted = useMounted();

  const { data, isFetching, isError } = useQuery<FetchProjectItem[]>({
    queryKey: ['projects', language, selectedTechs],
    queryFn: () => fetchProjects({ lang: language as Language, tech: selectedTechs }),
    initialData,
    enabled:
      language !== initialLang || (isMounted && selectedTechs.length !== initialTechs.length),
    refetchOnMount: process.env.NODE_ENV === 'development',
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const handleClick = useCallback(
    (text?: string) => {
      if (!text) return;

      toggleTech(text);
    },
    [toggleTech]
  );

  useEffect(() => {
    if (!isMounted) {
      setTechs(initialTechs);
      setInitialTechs(initialTechs);
    }
  }, [isMounted, initialTechs, setInitialTechs, setTechs]);

  if (isError) return <ErrorContent />;

  return (
    <div className='flex flex-col lg:h-full lg:flex-row'>
      <Sidebar size='md'>
        <Sidebar.Container desktopTitle={language === 'ko' ? '프로젝트' : 'project'}>
          <SidebarContent />
        </Sidebar.Container>
      </Sidebar>
      <div className='flex h-full flex-1 flex-col'>
        <SectionTitle className='h-14'>
          {selectedTechs.map(tech => (
            <SectionTitle.Item key={tech} onClose={handleClick}>
              {tech}
            </SectionTitle.Item>
          ))}
        </SectionTitle>
        <MainContent data={data} isFetching={isFetching} />
      </div>
    </div>
  );
};

export default Project;
