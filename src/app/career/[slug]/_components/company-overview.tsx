import type { CareerOverview } from '@/types/career';

type Props = {
  role: string;
  overview?: CareerOverview;
  language: 'ko' | 'en';
};

const CompanyOverview = ({ role, overview, language }: Props) => {
  if (!overview) return null;

  const label =
    language === 'ko'
      ? {
          title: '// 회사 개요',
          role: '역할',
          contribution: '전반적 기여',
          achievements: '주요 성과',
        }
      : {
          title: '// Company Overview',
          role: 'Role',
          contribution: 'Contribution',
          achievements: 'Key Achievements',
        };

  return (
    <section
      aria-label={label.title}
      className='rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-slate-700/50 dark:bg-slate-900'
    >
      <p className='mb-4 text-body-sm text-teal-600 dark:text-teal-400'>{label.title}</p>
      <div className='space-y-4 border-l-4 border-teal-400 pl-4'>
        <div className='space-y-1'>
          <p className='text-body-sm-bold text-slate-700 dark:text-slate-200'>{label.role}</p>
          <p className='text-body-sm text-slate-600 dark:text-slate-400'>{role}</p>
        </div>
        {overview.contribution && (
          <div className='space-y-1'>
            <p className='text-body-sm-bold text-slate-700 dark:text-slate-200'>
              {label.contribution}
            </p>
            <p className='text-body-sm text-slate-600 dark:text-slate-400'>
              {overview.contribution}
            </p>
          </div>
        )}
        {overview.achievements.length > 0 && (
          <div className='space-y-1'>
            <p className='text-body-sm-bold text-slate-700 dark:text-slate-200'>
              {label.achievements}
            </p>
            <ul className='list-disc space-y-1 pl-5'>
              {overview.achievements.map(achievement => (
                <li key={achievement} className='text-body-sm text-slate-600 dark:text-slate-400'>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompanyOverview;
