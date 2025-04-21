'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import FadeInUp from '@/components/shared/fade-in-up';
import { projectsMockData } from '@/constants/projects';
import { useProjectsPageStore } from '@/store/use-projects-page-store';

const MainContent = () => {
  const selectedTechs = useProjectsPageStore(state => state.selectedTechs);

  const {
    i18n: { language },
  } = useTranslation();

  const filteredProjects = useMemo(() => {
    const langProjectsMockData = projectsMockData[language as 'ko' | 'en'];

    return Object.values(langProjectsMockData).filter(project =>
      selectedTechs.includes(project.tech)
    );
  }, [language, selectedTechs]);

  return (
    <div className='flex flex-2 flex-col'>
      {filteredProjects.map((project, idx) => (
        <FadeInUp key={project.id} delay={idx * 0.1}>
          <div className='rounded-md border p-4'>
            <h3 className='text-lg font-semibold'>{project.name}</h3>
            <p className='text-sm'>{project.description}</p>
          </div>
        </FadeInUp>
      ))}
    </div>
  );
};

export default MainContent;
