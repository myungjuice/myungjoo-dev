'use client';

import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const GlobalError = ({ error, reset }: ErrorProps) => {
  const { t } = useTranslation('error');

  useEffect(() => {
    console.error('🚨 Error caught by error boundary:', error);
  }, [error]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-6 text-center'>
      <AlertTriangle className='mb-4 h-20 w-20 text-destructive' />
      <h1 className='text-3xl font-bold tracking-tight'>{t('title')}</h1>
      <p className='mt-2 text-muted-foreground'>{t('description')}</p>
      <Button variant='outline' className='mt-6' onClick={() => reset()}>
        {t('buttonText')}
      </Button>
    </div>
  );
};

export default GlobalError;
