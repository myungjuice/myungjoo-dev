'use client';

import type { FetchProjectItem } from '@/types/projects';

import ProjectCard from './project-card';
import SkeletonContent from './skeleton-content';

type Props = {
  data: FetchProjectItem[];
  isFetching: boolean;
};

const MainContent = ({ data, isFetching }: Props) => (
  <div className='grid auto-rows-fr grid-cols-1 items-stretch gap-6 p-6 lg:p-10 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4'>
    {isFetching ? (
      <SkeletonContent />
    ) : (
      data.map((project, idx) => (
        <ProjectCard
          key={project.id}
          delay={idx * 0.1}
          title={`Project ${idx + 1}`}
          project={project}
        />
      ))
    )}
  </div>
);

export default MainContent;
