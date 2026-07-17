import { useTranslation } from 'react-i18next';

import type { CareerProject } from '@/types/career';

export type CareerSummaryCaseStudyProps = {
  project: CareerProject;
};

const CareerSummaryCaseStudy = ({ project }: CareerSummaryCaseStudyProps) => {
  const { t } = useTranslation('career');
  const caseStudy = project.caseStudy;

  return (
    <article className='space-y-4'>
      <div className='space-y-1'>
        <h3 className='text-body-md-bold'>{project.title}</h3>
        <p className='text-body-sm text-slate-600 dark:text-slate-400'>{project.description}</p>
      </div>

      {caseStudy && (
        <div className='space-y-3'>
          {caseStudy.context && (
            <section className='space-y-1'>
              <h4 className='text-body-sm-bold'>{t('summary.caseStudy.context')}</h4>
              <p className='text-body-sm text-slate-600 dark:text-slate-400'>{caseStudy.context}</p>
            </section>
          )}
          {caseStudy.problem && (
            <section className='space-y-1'>
              <h4 className='text-body-sm-bold'>{t('summary.caseStudy.problem')}</h4>
              <p className='text-body-sm text-slate-600 dark:text-slate-400'>{caseStudy.problem}</p>
            </section>
          )}
          {caseStudy.action && caseStudy.action.length > 0 && (
            <section className='space-y-1'>
              <h4 className='text-body-sm-bold'>{t('summary.caseStudy.actions')}</h4>
              <ul className='list-disc space-y-1 pl-5'>
                {caseStudy.action.map(item => (
                  <li key={item} className='text-body-sm text-slate-600 dark:text-slate-400'>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {caseStudy.impact && caseStudy.impact.length > 0 && (
            <section className='space-y-1'>
              <h4 className='text-body-sm-bold'>{t('summary.caseStudy.impact')}</h4>
              <ul className='list-disc space-y-1 pl-5'>
                {caseStudy.impact.map(item => (
                  <li key={item} className='text-body-sm text-slate-600 dark:text-slate-400'>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {caseStudy.reflection && (
            <section className='space-y-1'>
              <h4 className='text-body-sm-bold'>{t('summary.caseStudy.reflection')}</h4>
              <p className='text-body-sm text-slate-600 dark:text-slate-400'>
                {caseStudy.reflection}
              </p>
            </section>
          )}
        </div>
      )}
    </article>
  );
};

export default CareerSummaryCaseStudy;
