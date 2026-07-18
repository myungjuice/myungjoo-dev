'use client';

import { useTranslation } from 'react-i18next';

import CareerLinkCopyButton from '@/components/shared/career-link-copy-button';
import { cn } from '@/lib/utils';
import type { CareerFilterItem, CareerProject } from '@/types/career';

type CareerCaseStudyCardProps = {
  slug: CareerFilterItem;
  project: CareerProject;
  index: number;
  total: number;
  viewed: boolean;
  onViewedChange: (projectId: number, viewed: boolean) => void;
  linkCopyText: { projectLabel: string; projectSuccess: string };
};

type ProjectBodyProps = {
  project: CareerProject;
  language: 'ko' | 'en';
};

const ProjectBody = ({ project, language }: ProjectBodyProps) => (
  <div className='space-y-2 p-5'>
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
              {project.caseStudy.action.map((item, index) => (
                <li
                  key={index}
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
              {project.caseStudy.impact.map((item, index) => (
                <li
                  key={index}
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
);

const CareerCaseStudyCard = ({
  slug,
  project,
  index,
  total,
  viewed,
  onViewedChange,
  linkCopyText,
}: CareerCaseStudyCardProps) => {
  const { t, i18n } = useTranslation('career');
  const language = i18n.language === 'en' ? 'en' : 'ko';

  return (
    <div
      id={`project-${project.id}`}
      className={cn(
        'w-full scroll-mt-16 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700/50 dark:bg-slate-900',
        viewed && 'bg-slate-100/80 dark:bg-slate-800/60'
      )}
    >
      <div className='flex items-center justify-between gap-2 rounded-t-lg bg-slate-200 px-5 py-3 dark:bg-slate-700'>
        <p
          className={cn(
            'min-w-0 flex-1 text-body-md-bold wrap-break-word text-gray-800 xl:border-l-4 xl:border-slate-400 xl:px-2 xl:text-body-lg-bold dark:text-slate-100',
            viewed && 'text-slate-400 line-through dark:text-slate-400'
          )}
        >
          {project.title}
        </p>
        <label className='inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-body-sm text-slate-400 dark:text-slate-300'>
          <input
            type='checkbox'
            checked={viewed}
            aria-label={t('detail.viewedStatus', { title: project.title })}
            className='size-4 accent-teal-500'
            onChange={event => onViewedChange(project.id, event.target.checked)}
          />
          {t('detail.viewed')}
        </label>
        <CareerLinkCopyButton
          slug={slug}
          projectId={project.id}
          label={linkCopyText.projectLabel}
          successMessage={linkCopyText.projectSuccess}
        />
        <span className='text-body-sm text-slate-400 tabular-nums dark:text-slate-500'>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
      {!viewed && <ProjectBody project={project} language={language} />}
    </div>
  );
};

export default CareerCaseStudyCard;
