import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

const Skeleton = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot='skeleton'
    className={cn('animate-pulse rounded-sm bg-gray-300 dark:bg-gray-800', className)}
    {...props}
  />
);

export { Skeleton };
