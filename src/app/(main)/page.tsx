'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import CodeHighlight from '@/components/shared/code-highlight';
import FadeInUp from '@/components/shared/fade-in-up';
import Typewriter from '@/components/shared/typewriter';

import SnakeGame from './_components/snake-game';

const MainPage = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation('main');

  const rawCode = useMemo(
    () => `
import { FaGithub, FaEnvelope } from 'react-icons/fa';

const Hello = () => (
  <div className="space-y-3 rounded-xl p-5 bg-gray-100 dark:bg-slate-900 shadow-md">
    <h4 className="text-heading-h4">${t('title')}!</h4>
    <p className="text-body-md flex items-center gap-2">
      <FaGithub />
      <span>${t('github')} 👉</span>
      <a
        href="${process.env.NEXT_PUBLIC_GITHUB_URL}"
        className="underline underline-offset-4 hover:text-teal-500 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>
    </p>
    <p className="text-body-md flex items-center gap-2">
      <FaEnvelope />
      <span>${t('email')} 📨</span>
      <a
        href="mailto:wkdaudwn1028@gmail.com"
        className="underline underline-offset-4 hover:text-green-600 transition-colors"
      >
        이메일 보내기
      </a>
    </p>
  </div>
);

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
        <FadeInUp>
          <Typewriter lines={lines} isLoop />
        </FadeInUp>
      </div>
      <div className='flex w-full items-center justify-center gap-5 xl:flex-row'>
        <div className='w-full lg:w-fit'>
          <FadeInUp>
            <CodeHighlight rawCode={rawCode} loadingClassName='w-full sm:w-[548px]' />
          </FadeInUp>
        </div>
        <div className='hidden items-center justify-center xl:flex'>
          <FadeInUp>
            <SnakeGame />
          </FadeInUp>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
