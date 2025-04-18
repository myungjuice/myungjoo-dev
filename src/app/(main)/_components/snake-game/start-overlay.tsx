'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';

type Props = {
  onStart: () => void;
};

const StartOverlay = ({ onStart }: Props) => {
  const { t } = useTranslation('snake');

  return (
    <div className='absolute bottom-20 z-[3] w-60 transform text-center'>
      <Button
        onClick={onStart}
        className='cursor-pointer rounded-lg border bg-[#FEA55F] px-4 py-2 text-body-sm text-black hover:bg-[#ffb277]'
      >
        {t('start_button')}
      </Button>
    </div>
  );
};

export default StartOverlay;
