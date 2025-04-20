'use client';

import Image from 'next/image';
import { FiImage } from 'react-icons/fi';

import { careerMockData } from '@/constants/career';
import { cn } from '@/lib/utils';
import { useCareerPageStore } from '@/store/use-career-page-store';

const MainContent = () => {
  const selectedFilter = useCareerPageStore(state => state.selectedFilter);

  const filteredCompanies = careerMockData.filter(company => selectedFilter.includes(company.id));

  return (
    <div className='flex flex-2 flex-col'>
      {filteredCompanies.map((company, idx) => (
        <div key={company.id} className='flex flex-1 rounded-xl'>
          <div className='flex justify-center p-10'>
            <div className='relative flex size-40 items-center justify-center rounded-full bg-white dark:bg-slate-700'>
              {company.logoUrl ? (
                <Image
                  src={company.logoUrl}
                  alt={company.name}
                  width={company.imageSize?.width || 100}
                  height={company.imageSize?.height || 100}
                  priority
                />
              ) : (
                <div className='flex size-20 items-center justify-center rounded-full'>
                  <FiImage className='text-slate-500 dark:text-slate-400' size={50} />
                </div>
              )}
            </div>
          </div>

          <div
            className={cn(
              'flex w-full flex-col gap-4 border-l border-slate-400 px-10 lg:flex dark:border-slate-700',
              idx === filteredCompanies.length - 1 ? 'py-10' : 'pt-10'
            )}
          >
            <div className='space-y-1'>
              <p className='text-heading-h5'>{company.name}</p>
              <p className='text-body-md'>{company.period}</p>
              <p className='text-body-md'>{company.slogan}</p>
              <p className='inline-block rounded text-body-sm-bold text-teal-500'>{company.role}</p>
            </div>

            {company.projects.map(project => (
              <div
                key={project.id}
                className='w-full space-y-2 rounded-lg bg-white p-5 dark:bg-slate-950'
              >
                <div className='flex items-center justify-between gap-2 border-l-4 border-slate-800 px-2'>
                  <p className='text-body-lg-bold text-gray-700 dark:text-slate-200'>
                    {project.title}
                  </p>
                  <p className='text-body-md text-gray-600 dark:text-slate-300'>{project.period}</p>
                </div>

                <p className='text-body-md text-gray-600 dark:text-slate-400'>
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainContent;
