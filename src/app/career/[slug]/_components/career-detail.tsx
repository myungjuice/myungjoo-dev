'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiImage } from 'react-icons/fi';

import FadeInUp from '@/components/shared/fade-in-up';
import { careerMockData } from '@/constants/career';
import { cn } from '@/lib/utils';
import type { CareerFilterItem } from '@/types/career';

type Props = {
  slug: CareerFilterItem;
};

const CareerDetail = ({ slug }: Props) => {
  const {
    i18n: { language },
  } = useTranslation();

  const company = careerMockData[language as 'ko' | 'en'][slug];

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const timer = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (!company) return null;

  const backLabel = language === 'ko' ? '경력으로 돌아가기' : 'Back to Career';

  return (
    <div className='flex min-h-full w-full flex-col'>
      <div className='flex flex-col px-6 py-6 sm:px-10 sm:py-8'>
        <FadeInUp>
          <Link
            href='/career'
            className='mb-6 inline-flex items-center gap-2 text-body-sm text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          >
            <FiArrowLeft />
            <span>{backLabel}</span>
          </Link>
        </FadeInUp>

        <FadeInUp delay={0.05}>
          <div className='mb-2 flex flex-col rounded-lg bg-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-5 dark:bg-slate-700'>
            <div className='relative hidden h-28 w-28 items-center justify-center sm:flex'>
              {company.logoUrl ? (
                <Image
                  src={company.logoUrl}
                  alt={company.name}
                  fill
                  sizes='100px'
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
              <p className='inline-block rounded text-body-sm-bold text-teal-500'>{company.role}</p>
            </div>
          </div>
        </FadeInUp>

        <div className='flex flex-col gap-5'>
          {company.projects.map((project, idx) => (
            <FadeInUp key={project.id} delay={0.1 + idx * 0.05} className='w-full'>
              <div
                id={`project-${project.id}`}
                className='w-full scroll-mt-6 space-y-2 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-slate-700/50 dark:bg-slate-900'
              >
                <div className='-mx-5 -mt-5 mb-3 flex items-center justify-between gap-2 rounded-t-lg bg-slate-200 px-5 py-3 dark:bg-slate-700'>
                  <div className='border-slate-400 sm:border-l-4 sm:px-2'>
                    <p className='text-body-md-bold wrap-break-word text-gray-800 xl:text-body-lg-bold dark:text-slate-100'>
                      {project.title}
                    </p>
                  </div>
                  <span className='shrink-0 text-body-sm text-slate-400 tabular-nums dark:text-slate-500'>
                    {String(idx + 1).padStart(2, '0')} /{' '}
                    {String(company.projects.length).padStart(2, '0')}
                  </span>
                </div>
                <p className='text-body-sm wrap-break-word text-gray-600 xl:text-body-md dark:text-slate-400'>
                  {project.description}
                </p>

                {project.caseStudy && (
                  <div className='mt-4 space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800'>
                    {project.caseStudy.context && (
                      <div className='space-y-1'>
                        <p className='text-body-sm text-emerald-700 dark:text-[#6A9955]'>
                          {`// ${language === 'ko' ? '상황' : 'context'}`}
                        </p>
                        <p className='text-body-sm text-slate-700 dark:text-slate-200'>
                          {project.caseStudy.context}
                        </p>
                      </div>
                    )}
                    {project.caseStudy.problem && (
                      <div className='space-y-1'>
                        <p className='text-body-sm text-emerald-700 dark:text-[#6A9955]'>
                          {`// ${language === 'ko' ? '문제' : 'problem'}`}
                        </p>
                        <p className='text-body-sm text-slate-700 dark:text-slate-200'>
                          {project.caseStudy.problem}
                        </p>
                      </div>
                    )}
                    {project.caseStudy.action && project.caseStudy.action.length > 0 && (
                      <div className='space-y-1'>
                        <p className='text-body-sm text-emerald-700 dark:text-[#6A9955]'>
                          {`// ${language === 'ko' ? '한 것' : 'action'}`}
                        </p>
                        <ul className='space-y-0.5'>
                          {project.caseStudy.action.map((item, i) => (
                            <li
                              key={i}
                              className='text-body-sm wrap-break-word text-slate-700 dark:text-slate-200'
                            >
                              {`• ${item}`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {project.caseStudy.impact && project.caseStudy.impact.length > 0 && (
                      <div className='space-y-1'>
                        <p className='text-body-sm text-emerald-700 dark:text-[#6A9955]'>
                          {`// ${language === 'ko' ? '결과' : 'impact'}`}
                        </p>
                        <ul className='space-y-0.5'>
                          {project.caseStudy.impact.map((item, i) => (
                            <li
                              key={i}
                              className='text-body-sm wrap-break-word text-slate-700 dark:text-slate-200'
                            >
                              {`✅ ${item}`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {project.caseStudy.reflection && (
                      <div className='space-y-1'>
                        <p className='text-body-sm text-emerald-700 dark:text-[#6A9955]'>
                          {`// ${language === 'ko' ? '배운 것' : 'reflection'}`}
                        </p>
                        <p className='text-body-sm text-slate-700 dark:text-slate-200'>
                          {project.caseStudy.reflection}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerDetail;
