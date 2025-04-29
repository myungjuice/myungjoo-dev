import { FaGithub, FaEnvelope } from 'react-icons/fa';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { HelloResponse } from '@/types/hello';
import type { Language } from '@/types/language';

type Props = {
  data: HelloResponse;
  isFetching: boolean;
  language: Language;
};

type SkeletonSize = {
  title: string;
  github: string;
  email: string;
  text01: string;
  text02: string;
};

const SKELETON_WIDTH: Record<Language, SkeletonSize> = {
  ko: {
    title: '460.8px',
    github: '589.61px',
    email: '589.61px',
    text01: '529.2px',
    text02: '369.61px',
  },
  en: {
    title: '460.8px',
    github: '589.61px',
    email: '589.61px',
    text01: '529.2px',
    text02: '369.61px',
  },
};

const SKELETON_HEIGHT: SkeletonSize = {
  title: '33.59px',
  github: '6px',
  email: '6px',
  text01: '19.59px',
  text02: '19.59px',
};

const CodeView = ({ data, isFetching, language }: Props) => (
  <div className='flex flex-col justify-center gap-4 rounded-xl bg-white p-6 pt-14 shadow-md xl:h-[400px] dark:bg-slate-800'>
    {isFetching ? (
      <Skeleton
        className={cn(`h-[${SKELETON_HEIGHT.title}] w-[${SKELETON_WIDTH[language].title}]`)}
      />
    ) : (
      <h4 className='text-body-md-bold sm:text-heading-h5'>{data.code.title}</h4>
    )}
    <div className='space-y-4 sm:space-y-2'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
        {isFetching ? (
          <Skeleton
            className={cn(`h-[${SKELETON_HEIGHT.github}] w-[${SKELETON_WIDTH[language].github}]`)}
          />
        ) : (
          <>
            <FaGithub className='hidden sm:block' />
            <span className='text-body-sm sm:text-body-md'>{data.code.github_text}</span>
            <a
              href={process.env.NEXT_PUBLIC_GITHUB_URL}
              className='text-body-sm underline underline-offset-4 transition-colors hover:text-teal-500 sm:text-body-md'
              target='_blank'
              rel='noopener noreferrer'
            >
              Github
            </a>
          </>
        )}
      </div>
      <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
        {isFetching ? (
          <Skeleton
            className={cn(`h-[${SKELETON_HEIGHT.email}] w-[${SKELETON_WIDTH[language].email}]`)}
          />
        ) : (
          <>
            <FaEnvelope className='hidden sm:block' />
            <span className='text-body-sm sm:text-body-md'>{data.code.email_text}</span>
            <a
              href='mailto:wkdaudwn1028@gmail.com'
              className='text-body-sm underline underline-offset-4 transition-colors hover:text-teal-500 sm:text-body-md'
            >
              {data.code.email_button_text}
            </a>
          </>
        )}
      </div>
    </div>
    <div className='space-y-1'>
      {isFetching ? (
        <>
          <Skeleton
            className={cn(`h-[${SKELETON_HEIGHT.text01}] w-[${SKELETON_WIDTH[language].text01}]`)}
          />
          <Skeleton
            className={cn(`h-[${SKELETON_HEIGHT.text02}] w-[${SKELETON_WIDTH[language].text02}]`)}
          />
        </>
      ) : (
        <>
          <p className='text-body-sm text-gray-600 dark:text-gray-300'>{data.code.text01}</p>
          <p className='text-body-sm text-gray-500 italic'>&quot;{data.code.text02}&quot;</p>
        </>
      )}
    </div>
  </div>
);

export default CodeView;
