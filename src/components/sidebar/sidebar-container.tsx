import { PropsWithChildren } from 'react';

type Props = {
  mobileTitle?: string;
  desktopTitle: string;
};

const SidebarContent = ({ mobileTitle, desktopTitle, children }: PropsWithChildren<Props>) => (
  <div className='flex w-full flex-col pt-6 lg:sticky lg:top-14 lg:self-start lg:pt-0'>
    {mobileTitle && (
      <div className='p-6 pt-0 lg:hidden'>
        <h2 className='text-body-sm text-slate-600 sm:text-body-md dark:text-slate-050'>
          {mobileTitle}
        </h2>
      </div>
    )}

    <div className='hidden h-14 w-full items-center justify-center gap-2 border-b border-slate-400 lg:flex dark:border-slate-700'>
      <h2 className='hidden text-body-md text-slate-600 lg:inline dark:text-slate-050'>
        {desktopTitle}
      </h2>
    </div>

    <div>{children}</div>
  </div>
);

export default SidebarContent;
