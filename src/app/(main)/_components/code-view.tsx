import { FaGithub, FaEnvelope } from 'react-icons/fa';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { HelloResponse } from '@/types/hello';
import type { Language } from '@/types/language';

type SkeletonItem = {
  base: string;
  smHeight: string;
  smWidth: Record<Language, string>;
};

type SkeletonSizeMap = {
  title: SkeletonItem;
  github: SkeletonItem;
  email: SkeletonItem;
  text01: SkeletonItem;
  text02: SkeletonItem;
};

const SKELETON_SIZES: SkeletonSizeMap = {
  title: {
    base: 'h-[34px] w-full',
    smHeight: 'sm:h-[34px]',
    smWidth: {
      ko: 'sm:w-[435px]',
      en: 'sm:w-[460px]',
    },
  },
  github: {
    base: 'h-[24px] w-full',
    smHeight: 'sm:h-[24px]',
    smWidth: {
      ko: 'sm:w-[397px]',
      en: 'sm:w-[590px]',
    },
  },
  email: {
    base: 'h-[24px] w-full',
    smHeight: 'sm:h-[24px]',
    smWidth: {
      ko: 'sm:w-[378px]',
      en: 'sm:w-[590px]',
    },
  },
  text01: {
    base: 'h-[20px] w-2/3',
    smHeight: 'sm:h-[20px]',
    smWidth: {
      ko: 'sm:w-[397px]',
      en: 'sm:w-[530px]',
    },
  },
  text02: {
    base: 'h-[20px] w-1/2',
    smHeight: 'sm:h-[20px]',
    smWidth: {
      ko: 'sm:w-[220px]',
      en: 'sm:w-[370px]',
    },
  },
};

type Props = {
  data: HelloResponse;
  isFetching: boolean;
  language: Language;
};

const CodeView = ({ data, isFetching, language }: Props) => {
  const skeleton = SKELETON_SIZES;

  return (
    <div
      className={cn(
        'flex w-full flex-col justify-center gap-4 rounded-xl bg-white p-6 shadow-md xl:h-[400px] dark:bg-slate-800',
        !isFetching && 'pt-14'
      )}
    >
      {isFetching ? (
        <Skeleton
          className={cn(
            skeleton.title.base,
            skeleton.title.smHeight,
            skeleton.title.smWidth[language]
          )}
        />
      ) : (
        <h4 className='text-body-md-bold sm:text-heading-h5'>{data.code.title}</h4>
      )}

      <div className='space-y-4 sm:space-y-2'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
          {isFetching ? (
            <Skeleton
              className={cn(
                skeleton.github.base,
                skeleton.github.smHeight,
                skeleton.github.smWidth[language]
              )}
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
              className={cn(
                skeleton.email.base,
                skeleton.email.smHeight,
                skeleton.email.smWidth[language]
              )}
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
              className={cn(
                skeleton.text01.base,
                skeleton.text01.smHeight,
                skeleton.text01.smWidth[language]
              )}
            />
            <Skeleton
              className={cn(
                skeleton.text02.base,
                skeleton.text02.smHeight,
                skeleton.text02.smWidth[language]
              )}
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
};

export default CodeView;
