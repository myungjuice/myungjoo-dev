import type { PropsWithChildren } from 'react';

import SectionTitleItem from './section-title-item';

const SectionTitle = ({ children }: PropsWithChildren) => (
  <div className='hidden h-14 border-b border-slate-400 lg:flex dark:border-slate-700'>
    {children}
  </div>
);

SectionTitle.Item = SectionTitleItem;

export default SectionTitle;
