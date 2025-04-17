/* eslint-disable no-console */
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import CodeHighlight from '@/components/shared/code-highlight';
import { Button } from '@/components/ui/button';

const NotFoundContents = () => {
  const router = useRouter();
  const { t } = useTranslation('not-found');

  const rawCode = useMemo(
    () => `
'use client';

import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';

const NotFound = () => {
  useEffect(() => {
    console.log("${t('console_01')}");
    console.log("${t('console_02')}");
    redirect('/');
  }, []);

  return null;
};

export default NotFound;
`,
    [t]
  );

  useEffect(() => {
    console.log(t('console_01'));
    console.log(t('console_02'));
  }, [t]);

  return (
    <div className='flex min-h-[calc(100vh-80px-114px)] flex-col items-center justify-center gap-10 px-4 py-10'>
      <div className='flex h-full w-full flex-col items-center justify-center gap-10 text-sm sm:gap-20 md:flex-row'>
        <Image src='/images/404.png' alt='404' width={304} height={165} priority />
        <CodeHighlight rawCode={rawCode} />
      </div>
      <Button variant='destructive' onClick={() => router.push('/')}>
        {t('back_home')}
      </Button>
    </div>
  );
};

export default NotFoundContents;
