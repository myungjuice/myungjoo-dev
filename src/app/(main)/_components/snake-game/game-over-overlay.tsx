'use client';

import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  status: 'win' | 'fail';
  onStart: () => void;
  onRestart: () => void;
}

const GameOverOverlay = ({ status, onStart, onRestart }: Props) => {
  const { t } = useTranslation('snake');

  return (
    <div className='absolute top-[calc(50%-40px)] z-[3] w-60 -translate-y-1/2 transform text-center'>
      <div className='bg-[#011627d6] py-3'>
        <span
          className={cn('!text-heading-h5', status === 'win' ? 'text-teal-400' : 'text-red-400')}
        >
          {status === 'win' ? t('game_win') : t('game_over')}
        </span>
      </div>
      <div className='h-12'>
        <Button
          variant='ghost'
          onClick={onStart}
          className='h-full w-full font-bold text-slate-800 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700 dark:hover:text-white'
        >
          {t('game_button')}
        </Button>
        <Button
          variant='ghost'
          onClick={onRestart}
          className='h-full w-full font-bold text-slate-800 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700 dark:hover:text-white'
        >
          {t('game_reset_button')}
        </Button>
      </div>
    </div>
  );
};

export default GameOverOverlay;
