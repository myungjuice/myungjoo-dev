'use client';

import { useTranslation } from 'react-i18next';

interface Props {
  score: number;
}

const ScoreBoard = ({ score }: Props) => {
  const { t } = useTranslation('snake');

  return (
    <div className='relative z-[3] flex w-full flex-1 flex-col items-start justify-center rounded-md bg-slate-200 p-4 text-slate-900 dark:bg-slate-800 dark:text-slate-50'>
      <p className='text-body-sm'>&gt; {t('food')}</p>

      <div className='mt-4 grid w-full grid-cols-5 justify-items-center gap-5'>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className='h-3 w-3 rounded-full bg-[#43D9AD] shadow-[0_0_10px_#43D9AD]'
            style={{ opacity: i < score ? 1 : 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;
