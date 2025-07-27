'use client';

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdCode } from 'react-icons/md';

import CodeHighlight from '@/components/shared/code-highlight';
import FadeInUp from '@/components/shared/fade-in-up';
import Typewriter from '@/components/shared/typewriter';
import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

import CodeView from './code-view';
import SnakeGame from './snake-game';

const Main = () => {
  const [isShowCodeHighlight, setIsShowCodeHighlight] = useState(false);

  const {
    t,
    i18n: { language },
  } = useTranslation('main');

  const rawCode = useMemo(
    () => `
import { FaGithub, FaEnvelope } from 'react-icons/fa';

const Hello = () => (
  <div className='flex h-[400px] flex-col justify-center gap-4 rounded-xl bg-white p-6 pt-14 shadow-md dark:bg-slate-800'>
    <h4 className='text-heading-h6 sm:text-heading-h5'>${t('title')}!</h4>
    <div className='space-y-4 sm:space-y-2'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
        <FaGithub className='hidden sm:block' />
        <span className='text-body-sm sm:text-body-md'>${t('github')} 👉</span>
        <a
          href="${process.env.NEXT_PUBLIC_GITHUB_URL}"
          target='_blank'
          rel='noopener noreferrer'
        >
          Github
        </a>
      </div>
      <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
        <FaEnvelope className='hidden sm:block' />
        <span className='text-body-sm sm:text-body-md'>${t('email')} 📨</span>
        <a href='mailto:wkdaudwn1028@gmail.com'>
          ${t('email_button')}
        </a>
      </div>
    </div>
    <div className='space-y-1'>
      <p className='text-body-sm text-gray-600 dark:text-gray-300'>${t('text_04')}</p>
      <p className='text-body-sm text-gray-500 italic'>&quot;${t('text_05')}&quot;</p>
    </div>
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
        className: 'text-heading-h5 sm:text-heading-h4 text-teal-500',
      },
    ],
    [t, language]
  );

  return (
    <div className='flex h-full flex-col items-center justify-center gap-5 px-4 py-10 xl:gap-8'>
      <div className='h-[110px] sm:h-[139px]'>
        <FadeInUp>
          <Typewriter lines={lines} isLoop />
        </FadeInUp>
      </div>
      <div className='flex w-full items-center justify-center gap-5 xl:flex-row'>
        <div className={cn('lg:w-fit', isShowCodeHighlight && 'w-full')}>
          <FadeInUp>
            <div className='relative'>
              <Toggle
                aria-label='Toggle italic'
                className='absolute top-2 right-2 z-10'
                pressed={isShowCodeHighlight}
                onPressedChange={() => setIsShowCodeHighlight(prev => !prev)}
              >
                <MdCode />
                <Label className='cursor-pointer'>code</Label>
              </Toggle>
              {isShowCodeHighlight ? (
                <CodeHighlight rawCode={rawCode} loadingClassName='w-full sm:w-[548px]' />
              ) : (
                <CodeView />
              )}
            </div>
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

export default Main;
