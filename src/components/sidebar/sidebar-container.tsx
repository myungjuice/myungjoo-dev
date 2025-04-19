import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { aboutTabKoMap } from '@/constants/about';
import { useAboutPageStore } from '@/store/use-about-page-store';

type Props = {
  pageTitle: string;
};

const SidebarContent = ({ pageTitle, children }: PropsWithChildren<Props>) => {
  const { selectedTab } = useAboutPageStore(state => ({
    selectedTab: state.selectedTab,
    setMenu: state.setMenu,
  }));

  const {
    i18n: { language },
  } = useTranslation();

  return (
    <div className='flex w-full flex-col'>
      <div className='p-6 lg:hidden'>
        <h2 className='text-body-sm text-slate-600 sm:text-body-md dark:text-slate-050'>
          {pageTitle}
        </h2>
      </div>
      <div className='hidden h-14 w-full items-center justify-center gap-2 border-b border-slate-400 lg:flex dark:border-slate-700'>
        <h2 className='hidden text-body-md text-slate-600 lg:inline dark:text-slate-050'>
          {language === 'ko' ? aboutTabKoMap[selectedTab] : selectedTab}
        </h2>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default SidebarContent;
