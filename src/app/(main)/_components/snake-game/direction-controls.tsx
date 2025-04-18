'use client';

import { useTranslation } from 'react-i18next';
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { Button } from '@/components/ui/button';

const DirectionControls = () => {
  const { t } = useTranslation('snake');

  return (
    <div className='flex w-full flex-1 flex-col items-start justify-center rounded-md bg-slate-200 p-4 text-slate-900 dark:bg-slate-800 dark:text-slate-50'>
      <p className='text-body-sm'>&gt; {t('control_text_01')}</p>
      <p className='text-body-sm'>&gt; {t('control_text_02')}</p>

      <div className='mt-4 flex w-full flex-col items-center justify-center gap-2'>
        <Button size='icon'>
          <FaArrowUp />
        </Button>

        <div className='grid grid-cols-3 gap-2'>
          <Button size='icon'>
            <FaArrowLeft />
          </Button>
          <Button size='icon'>
            <FaArrowDown />
          </Button>
          <Button size='icon'>
            <FaArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DirectionControls;
