import { useMemo } from 'react';
import { FaFolder } from 'react-icons/fa';
import { HiChevronRight } from 'react-icons/hi';

import { Button } from '@/components/ui/button';
import { aboutPageData } from '@/constants/about';
import { folderColors } from '@/constants/folder-colors';
import { cn } from '@/lib/utils';
import { useAboutPageStore } from '@/store/use-about-page-store';
import { type Menu } from '@/types/about';

const SidebarContent = () => {
  const { selectedTab, selectedMenu, setMenu } = useAboutPageStore(state => ({
    selectedTab: state.selectedTab,
    selectedMenu: state.selectedMenu,
    setMenu: state.setMenu,
  }));

  const menus = useMemo(() => Object.keys(aboutPageData[selectedTab].menu), [selectedTab]);

  const handleMenuClick = (menu: string) => () => {
    setMenu(menu as Menu);
  };

  return (
    <div>
      {menus.map((menu, idx) => (
        <Button
          key={menu}
          variant={selectedMenu === menu ? 'outline' : 'ghost'}
          className='w-full justify-start rounded-none px-0 py-5'
          onClick={handleMenuClick(menu)}
        >
          <div className={cn('flex items-center gap-2 px-6 py-2')}>
            <HiChevronRight size={20} className={cn(selectedMenu === menu && 'rotate-90')} />
            <div className='flex items-center gap-1.5'>
              <FaFolder size={20} className={folderColors[idx]} />
              <span
                className={cn(
                  'text-body-md text-slate-500 dark:text-slate-400',
                  selectedMenu === menu && 'text-slate-900 dark:text-slate-100'
                )}
              >
                {menu}
              </span>
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default SidebarContent;
