import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

import SectionTitleItem from './section-title-item';

type Props = {
  className?: string;
};

const SectionTitle = ({ className, children }: PropsWithChildren<Props>) => (
  <div
    className={cn(
      'hidden h-[57px] border-b border-slate-400 lg:sticky lg:top-14 lg:z-10 lg:flex lg:w-full lg:self-start lg:bg-gray-100 dark:border-slate-700 lg:dark:bg-slate-900',
      className
    )}
  >
    {children}
  </div>
);

SectionTitle.Item = SectionTitleItem;

export default SectionTitle;
