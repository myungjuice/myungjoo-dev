'use client';

import Image from 'next/image';
import { FiImage } from 'react-icons/fi';

import FadeInUp from '@/components/shared/fade-in-up';
import { careerMockData } from '@/constants/career';
import { cn } from '@/lib/utils';
import { useCareerPageStore } from '@/store/use-career-page-store';

const MainContent = () => {
  const selectedFilter = useCareerPageStore(state => state.selectedFilter);

  const filteredCompanies = careerMockData.filter(company => selectedFilter.includes(company.id));

  return (
    <div className='flex flex-2 flex-col'>
      {filteredCompanies.map((company, idx) => (
        <FadeInUp key={company.id} delay={idx * 0.1}>
          <div
            className={cn(
              'flex flex-col px-6 sm:px-10 lg:flex',
              idx === filteredCompanies.length - 1 ? 'py-6 sm:py-10' : 'pt-6 sm:pt-10'
            )}
          >
            <div className='flex flex-col rounded-t-lg bg-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-5 dark:bg-slate-700'>
              <div className='relative hidden h-28 w-28 items-center justify-center sm:flex'>
                {company.logoUrl ? (
                  <Image
                    src={company.logoUrl}
                    alt={company.name}
                    fill
                    priority
                    className={cn('object-contain p-[25%]', company.imageClassName)}
                  />
                ) : (
                  <FiImage className='h-14 w-14 text-slate-500 dark:text-slate-400' />
                )}
              </div>

              <div className='space-y-1'>
                <p className='text-heading-h6 xl:text-heading-h5'>{company.name}</p>
                <p className='text-body-sm xl:text-body-md'>{company.period}</p>
                <p className='text-body-sm xl:text-body-md'>{company.slogan}</p>
                <p className='inline-block rounded text-body-sm-bold text-teal-500'>
                  {company.role}
                </p>
              </div>
            </div>

            {company.projects.map((project, idx2) => (
              <div
                key={project.id}
                className={cn(
                  'w-full space-y-2 bg-white p-5 dark:bg-slate-950',
                  idx2 === company.projects.length - 1
                    ? 'rounded-b-lg'
                    : 'border-b border-slate-500 dark:border-slate-500'
                )}
              >
                <div className='flex items-center justify-between gap-2 border-slate-800 sm:border-l-4 sm:px-2'>
                  <p className='text-body-md-bold text-gray-800 xl:text-body-lg-bold dark:text-slate-100'>
                    {project.title}
                  </p>
                </div>
                <p className='text-body-sm text-gray-600 xl:text-body-md dark:text-slate-300'>
                  {project.period}
                </p>

                <p className='text-body-sm text-gray-600 xl:text-body-md dark:text-slate-400'>
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </FadeInUp>
      ))}
    </div>
  );
};

export default MainContent;
