import Image from 'next/image';
import { memo } from 'react';
import { FaGithub } from 'react-icons/fa';

import FadeInUp from '@/components/shared/fade-in-up';
import { Button } from '@/components/ui/button';
import { techIconMap } from '@/constants/projects';
import type { ProjectItem } from '@/types/projects';

type Props = {
  delay: number;
  title: string;
  project: ProjectItem;
};

const ProjectCard = memo(({ delay, title, project }: Props) => {
  const Icon = techIconMap[project.tech];

  return (
    <FadeInUp delay={delay} className='h-full'>
      <div className='flex h-full flex-col gap-2'>
        <div className='flex items-center gap-2 text-body-md'>
          <p className='text-body-md-bold text-indigo-500'>{title}</p>
          <p className='text-body-md text-slate-400'>// {project.name}</p>
        </div>
        <div className='flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg'>
          <div className='relative h-64 w-full'>
            {Icon && <Icon size={20} className='absolute top-4 right-4 z-10 text-teal-500' />}
            <Image fill src={project.thumbnailUrl} alt={project.name} sizes='480px' />
          </div>
          <div className='bg-white dark:bg-slate-800'>
            <div className='flex-1 p-7 pb-0'>
              <p className='text-body-sm text-slate-600 sm:text-body-md dark:text-slate-300'>
                {project.description}
              </p>
            </div>
            <div className='flex w-full items-center justify-between gap-4 p-7 pt-4 sm:w-1/2 sm:pr-0'>
              <Button className='flex flex-1 items-center p-0'>
                <a
                  href={project.githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex h-full w-full items-center justify-center gap-2 text-body-sm'
                >
                  <FaGithub />
                  {project.githubButtonText}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FadeInUp>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
