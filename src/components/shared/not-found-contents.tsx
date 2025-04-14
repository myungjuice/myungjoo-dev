'use client';

import { Ghost } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';

const NotFoundClient = () => {
  const { t } = useTranslation('not-found');

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-6 text-center'>
      <Ghost className='mb-4 h-20 w-20 text-muted-foreground' />
      <h1 className='text-4xl font-bold tracking-tight'>{t('title')}</h1>
      <p className='mt-2 text-muted-foreground'>{t('description')}</p>
      <Link href='/' passHref>
        <Button className='mt-6'>{t('buttonText')}</Button>
      </Link>
    </div>
  );
};

export default NotFoundClient;
