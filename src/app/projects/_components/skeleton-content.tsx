'use client';

import { Skeleton } from '@/components/ui/skeleton';

const SkeletonContent = () =>
  Array.from({ length: 8 }).map((_, idx) => (
    <div key={`project-loading-${idx}`} className='flex h-full flex-col gap-2'>
      <div className='flex items-center gap-2 text-body-md'>
        <Skeleton className='h-6 w-20' />
        <Skeleton className='h-6 w-36' />
      </div>
      <div className='flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg'>
        <div className='h-[256px]'>
          <Skeleton className='h-full w-full' />
        </div>

        <div className='w-full bg-white dark:bg-slate-800'>
          <div className='flex w-full flex-1 flex-col gap-1 p-4 pb-0 sm:p-7 sm:pb-0'>
            <Skeleton className='h-6 w-1/2' />
            <Skeleton className='h-6 w-2/3' />
            <Skeleton className='h-6 w-full' />
          </div>
          <div className='flex !w-full items-center gap-4 p-4 pt-4 sm:w-1/2 sm:p-7'>
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full' />
          </div>
        </div>
      </div>
    </div>
  ));

export default SkeletonContent;
