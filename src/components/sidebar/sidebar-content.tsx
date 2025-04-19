import { type ReactNode } from 'react';

type Props = {
  pageTitle: string;
  title: string;
  children: ReactNode;
};

const SidebarContent = ({ pageTitle, title, children }: Props) => (
  <div className='flex flex-col px-6 py-4'>
    <div className='pb-6 lg:hidden'>
      <h2 className='text-body-sm text-slate-600 dark:text-slate-050'>{pageTitle}</h2>
    </div>
    <h2 className='hidden text-body-md text-slate-600 lg:inline dark:text-slate-050'>{title}</h2>
    <div>{children}</div>
  </div>
);

export default SidebarContent;
