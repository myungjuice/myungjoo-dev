import type { PropsWithChildren } from 'react';

import SectionTitleItem from './section-title-item';

const SectionTitle = ({ children }: PropsWithChildren) => (
  <div className='hidden h-[57px] border-b border-slate-400 lg:sticky lg:top-14 lg:z-10 lg:flex lg:w-full lg:self-start lg:bg-gray-100 dark:border-slate-700 lg:dark:bg-slate-900'>
    {children}
  </div>
);

SectionTitle.Item = SectionTitleItem;

export default SectionTitle;
