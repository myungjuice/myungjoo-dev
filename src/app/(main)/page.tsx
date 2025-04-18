'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import CodeHighlight from '@/components/shared/code-highlight';
import Typewriter from '@/components/shared/typewriter';

import SnakeGame from './_components/snake-game';

const MainPage = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation('main');

  const rawCode = useMemo(
    () => `
'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const Hello = () => {
useEffect(() => {
    console.log("${t('console_01')}");
    console.log("${t('console_02')}");

    const githubLink = "${process.env.NEXT_PUBLIC_GITHUB_URL}";
    redirect(githubLink);
}, []);

return null;
};

export default Hello;
`,
    [t]
  );

  const lines = useMemo(
    () => [
      {
        text: t('text_01'),
        as: 'p' as const,
        className: 'text-body-md sm:text-body-lg text-gray-600 dark:text-slate-400',
      },
      {
        text: t('name') + (language === 'ko' ? ' 입니다.' : ''),
        as: 'h1' as const,
        className: 'text-heading-h3 sm:text-heading-h1 text-gray-800 dark:text-slate-050',
      },
      {
        text: `> ${t('text_02')}`,
        as: 'p' as const,
        className: 'text-heading-h5 sm:text-heading-h4 text-indigo-500',
      },
    ],
    [t, language]
  );

  return (
    <div className='flex h-full flex-col items-center justify-center gap-5 px-4 py-10 xl:gap-10'>
      <div className='h-[110px] sm:h-[139px]'>
        <Typewriter lines={lines} isLoop />
      </div>
      <div className='flex w-full items-center justify-center gap-5 xl:flex-row'>
        <div className='w-full sm:w-fit'>
          <CodeHighlight rawCode={rawCode} className='h-80 w-full sm:w-[548px]' />
        </div>
        <div className='hidden items-center justify-center xl:flex'>
          <SnakeGame />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
