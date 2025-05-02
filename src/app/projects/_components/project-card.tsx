import Image from 'next/image';
import { memo } from 'react';
import { FaGithub } from 'react-icons/fa';

import FadeInUp from '@/components/shared/fade-in-up';
import { Button } from '@/components/ui/button';
import type { FetchProjectItem } from '@/types/projects';

import TechIcons from './tech-icons';

type Props = {
  delay: number;
  title: string;
  project: FetchProjectItem;
};

const ProjectCard = memo(({ delay, title, project }: Props) => (
  <FadeInUp delay={delay} className='h-full'>
    <div className='flex h-full flex-col gap-2'>
      <div className='flex items-center gap-2 text-body-md'>
        <p className='text-body-md-bold text-indigo-500'>{title}</p>
        <p className='text-body-md text-slate-400'>// {project.title}</p>
      </div>
      <div className='flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-400 dark:border-slate-700'>
        <div className='relative h-64 w-full bg-gray-200 dark:bg-slate-950'>
          <div className='absolute top-4 right-4 z-10 flex gap-2'>
            <TechIcons techs={project.tech_stack} />
          </div>
          <Image
            fill
            src={project.thumbnail_url}
            alt={project.title}
            sizes='480px'
            className='object-cover [object-position:center_45%]'
          />
        </div>

        <div className='bg-white dark:bg-slate-800'>
          <div className='flex-1 p-4 pb-0 sm:p-7 sm:pb-0'>
            <pre className='text-body-sm break-words whitespace-pre-wrap text-slate-600 sm:text-body-md dark:text-slate-300'>
              {project.description}
            </pre>
          </div>
          <div className='flex w-full items-center gap-4 p-4 pt-4 sm:w-1/2 sm:p-7'>
            <Button className='flex flex-1 items-center p-0'>
              <a
                href={project.github_url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex h-full w-full items-center justify-center gap-2 text-body-sm'
              >
                <FaGithub />
                Github
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </FadeInUp>
));

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
