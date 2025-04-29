/* eslint-disable no-console */

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import CodeHighlight from '@/components/shared/code-highlight';
import { Button } from '@/components/ui/button';

export default function ErrorContent() {
  const router = useRouter();
  const { t } = useTranslation('error');

  const rawCode = useMemo(
    () => `
'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const Error = () => {
  useEffect(() => {
    console.log("${t('console_01')}");
    console.log("${t('console_02')}");
    redirect('/');
  }, []);

  return null;
};

export default Error;
`,
    [t]
  );

  useEffect(() => {
    console.log(t('console_01'));
    console.log(t('console_02'));
  }, [t]);

  return (
    <div className='flex min-h-[calc(100vh-80px-114px)] flex-col items-center justify-center gap-10 px-4 py-10'>
      <div className='relative flex h-full w-full flex-col items-center justify-center pt-40 text-sm'>
        <Image
          src='/images/error.png'
          alt='404'
          width={304}
          height={165}
          priority
          className='absolute -top-20'
        />
        <CodeHighlight rawCode={rawCode} loadingClassName='h-80 w-96' />
      </div>
      <Button variant='destructive' onClick={() => router.push('/')}>
        {t('back_home')}
      </Button>
    </div>
  );
}
