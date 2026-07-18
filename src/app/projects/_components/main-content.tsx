'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import resumeContent from '@/content/resume.json';
import { useProjectsPageStore } from '@/store/use-projects-page-store';
import type { ProjectItem } from '@/types/projects';

import ProjectCard from './project-card';

const MainContent = () => {
  const selectedTechs = useProjectsPageStore(state => state.selectedTechs);

  const {
    i18n: { language },
  } = useTranslation();

  const filteredProjects = useMemo(() => {
    const portfolio = resumeContent[language as 'ko' | 'en'].portfolio as ProjectItem;

    return selectedTechs.includes(portfolio.tech as 'react') ? [portfolio] : [];
  }, [language, selectedTechs]);

  return (
    <div className='grid auto-rows-fr grid-cols-1 items-stretch gap-6 p-6 lg:p-10 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4'>
      {filteredProjects.map((project, idx) => (
        <ProjectCard
          key={project.id}
          delay={idx * 0.1}
          title={`Project ${idx + 1}`}
          project={project}
        />
      ))}
    </div>
  );
};

export default MainContent;
