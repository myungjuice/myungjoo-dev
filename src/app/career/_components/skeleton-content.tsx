'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const SkeletonContent = () => (
  <div className='flex flex-2 flex-col'>
    {Array.from({ length: 2 }).map((_, idx) => (
      <div
        key={`career-loading-${idx}`}
        className={cn(
          'flex flex-col px-6 sm:px-10 lg:flex',
          idx === 2 ? 'py-6 sm:py-10' : 'pt-6 sm:pt-10'
        )}
      >
        <div className='flex flex-col rounded-t-lg bg-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-5 dark:bg-slate-700'>
          <div className='relative hidden h-28 w-28 items-center justify-center sm:flex'>
            <Skeleton className='h-full w-full rounded-full p-[25%]' />
          </div>

          <div className='flex w-full flex-col gap-2'>
            <Skeleton className='h-[33.59px] w-40 sm:w-96' />
            <Skeleton className='h-6 w-48' />
            <Skeleton className='h-6 w-full' />
            <Skeleton className='h-5 w-64' />
          </div>
        </div>

        {Array.from({ length: 3 }).map((__, idx2) => (
          <div
            key={idx2}
            className={cn(
              'w-full space-y-2 bg-white p-5 dark:bg-slate-950',
              idx2 === 2 ? 'rounded-b-lg' : 'border-b border-slate-500 dark:border-slate-500'
            )}
          >
            <Skeleton className='h-7 w-48 sm:w-96' />
            <Skeleton className='h-5 w-full' />
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default SkeletonContent;
