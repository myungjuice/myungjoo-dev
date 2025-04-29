import { FaGithub, FaEnvelope } from 'react-icons/fa';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { HelloResponse } from '@/types/hello';
import type { Language } from '@/types/language';

type SkeletonSize = {
  height: string;
  smWidth: string;
};

type SkeletonSizeMap = {
  title: SkeletonSize;
  github: SkeletonSize;
  email: SkeletonSize;
  text01: SkeletonSize;
  text02: SkeletonSize;
};

const SKELETON_SIZES: Record<Language, SkeletonSizeMap> = {
  ko: {
    title: { height: '34px', smWidth: '435px' },
    github: { height: '24px', smWidth: '397px' },
    email: { height: '24px', smWidth: '378px' },
    text01: { height: '20px', smWidth: '397px' },
    text02: { height: '20px', smWidth: '220px' },
  },
  en: {
    title: { height: '34px', smWidth: '460px' },
    github: { height: '24px', smWidth: '590px' },
    email: { height: '24px', smWidth: '590px' },
    text01: { height: '20px', smWidth: '530px' },
    text02: { height: '20px', smWidth: '370px' },
  },
};

type Props = {
  data: HelloResponse;
  isFetching: boolean;
  language: Language;
};

const CodeView = ({ data, isFetching, language }: Props) => {
  const skeleton = SKELETON_SIZES[language];

  return (
    <div
      className={cn(
        'flex w-full flex-col justify-center gap-4 rounded-xl bg-white p-6 shadow-md xl:h-[400px] dark:bg-slate-800',
        !isFetching && 'pt-14 sm:pt-6'
      )}
    >
      {isFetching ? (
        <Skeleton
          className={cn(`h-[${skeleton.title.height}] w-full`, `sm:w-[${skeleton.title.smWidth}]`)}
        />
      ) : (
        <h4 className='text-body-md-bold sm:text-heading-h5'>{data.code.title}</h4>
      )}

      <div className='space-y-4 sm:space-y-2'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2'>
          {isFetching ? (
            <Skeleton
              className={cn(
                `h-[${skeleton.github.height}] w-full`,
                `sm:w-[${skeleton.github.smWidth}]`
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
                `h-[${skeleton.email.height}] w-full`,
                `sm:w-[${skeleton.email.smWidth}]`
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
                `h-[${skeleton.text01.height}] w-2/3`,
                `sm:w-[${skeleton.text01.smWidth}]`
              )}
            />
            <Skeleton
              className={cn(
                `h-[${skeleton.text02.height}] w-1/2`,
                `sm:w-[${skeleton.text02.smWidth}]`
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
