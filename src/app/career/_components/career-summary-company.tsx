import { useTranslation } from 'react-i18next';

import type { CareerCompany } from '@/types/career';

import CareerSummaryCaseStudy from './career-summary-case-study';

export type CareerSummaryCompanyProps = {
  company: CareerCompany;
};

const CareerSummaryCompany = ({ company }: CareerSummaryCompanyProps) => {
  const { t } = useTranslation('career');
  const { overview } = company;

  return (
    <div className='space-y-6'>
      <header className='space-y-1'>
        <h2 className='text-heading-h6'>{company.name}</h2>
        <p className='text-body-sm text-slate-600 dark:text-slate-400'>{company.period}</p>
        <p className='text-body-sm-bold text-teal-500'>{company.role}</p>
      </header>

      {overview?.contribution && (
        <section className='space-y-1'>
          <h3 className='text-body-md-bold'>{t('summary.contribution')}</h3>
          <p className='text-body-sm text-slate-600 dark:text-slate-400'>{overview.contribution}</p>
        </section>
      )}

      {overview?.achievements && overview.achievements.length > 0 && (
        <section className='space-y-1'>
          <h3 className='text-body-md-bold'>{t('summary.achievements')}</h3>
          <ul className='list-disc space-y-1 pl-5'>
            {overview.achievements.map(achievement => (
              <li key={achievement} className='text-body-sm text-slate-600 dark:text-slate-400'>
                {achievement}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className='space-y-6'>
        {company.projects.map(project => (
          <CareerSummaryCaseStudy key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default CareerSummaryCompany;
