'use client';

import { useTranslation } from 'react-i18next';

const FocusOverlay = () => {
  const { t } = useTranslation('snake');

  return (
    <div className='absolute top-[calc(50%-40px)] left-0 z-[4] w-60 w-full -translate-y-1/2 transform text-center'>
      <div className='bg-slate-950 py-3'>
        <span className='!text-heading-h5 text-red-400'>{t('focus')}</span>
      </div>
    </div>
  );
};

export default FocusOverlay;
