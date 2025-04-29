'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdCode } from 'react-icons/md';

import CodeHighlight from '@/components/shared/code-highlight';
import ErrorContent from '@/components/shared/error-content';
import FadeInUp from '@/components/shared/fade-in-up';
import Typewriter from '@/components/shared/typewriter';
import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';
import { fetchHello } from '@/lib/api/hello';
import { cn } from '@/lib/utils';
import type { HelloResponse } from '@/types/hello';

import CodeView from './code-view';
import SnakeGame from './snake-game';

type Props = {
  initialData: HelloResponse;
};

const Main = ({ initialData }: Props) => {
  const [isShowCodeHighlight, setIsShowCodeHighlight] = useState(false);

  const {
    i18n: { language },
  } = useTranslation();

  const { data, isFetching, isError } = useQuery({
    queryKey: ['hello', language],
    queryFn: () => fetchHello({ lang: language }),
    initialData,
    refetchOnMount: process.env.NODE_ENV === 'development',
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const rawCode = useMemo(
    () => `
import { FaGithub, FaEnvelope } from 'react-icons/fa';

const Hello = () => (
  <div className='flex h-[400px] flex-col justify-center gap-4 rounded-xl bg-white p-6 pt-14 shadow-md dark:bg-slate-800'>
    <h4 className='text-heading-h6 sm:text-heading-h5'>${data.code.title}!</h4>
    <div className='space-y-4 sm:space-y-2'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
        <FaGithub className='hidden sm:block' />
        <span className='text-body-sm sm:text-body-md'>${data.code.github_text} 👉</span>
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
        <span className='text-body-sm sm:text-body-md'>${data.code.email_text} 📨</span>
        <a href='mailto:wkdaudwn1028@gmail.com'>
          ${data.code.email_button_text}
        </a>
      </div>
    </div>
    <div className='space-y-1'>
      <p className='text-body-sm text-gray-600 dark:text-gray-300'>${data.code.text01}</p>
      <p className='text-body-sm text-gray-500 italic'>&quot;${data.code.text02}&quot;</p>
    </div>
  </div>
);

export default Hello;
`,
    [data]
  );

  const lines = useMemo(
    () => [
      {
        text: data.text01,
        as: 'p' as const,
        className: 'text-body-md sm:text-body-lg text-gray-600 dark:text-slate-400',
      },
      {
        text: data.name,
        as: 'h1' as const,
        className: 'text-heading-h3 sm:text-heading-h1 text-gray-800 dark:text-slate-050',
      },
      {
        text: `> ${data.text02}`,
        as: 'p' as const,
        className: 'text-heading-h5 sm:text-heading-h4 text-teal-500',
      },
    ],
    [data]
  );

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <ErrorContent />;
  }

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
                <CodeView data={data} />
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
