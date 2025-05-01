import { useMemo } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { folderColors } from '@/constants/folder-colors';
import { useAboutPageStore } from '@/store/use-about-page-store';
import type { Menu, AboutTabKey, AboutCategoryItem } from '@/types/about';

import MenuItem from './menu-item';

type Props = {
  tabs: AboutCategoryItem[];
  categoryAboutData: AboutCategoryItem[];
};

const SidebarContent = ({ tabs, categoryAboutData }: Props) => {
  const { selectedTab, selectedMenu, setTab, setMenu } = useAboutPageStore(state => ({
    selectedTab: state.selectedTab,
    selectedMenu: state.selectedMenu,
    setTab: state.setTab,
    setMenu: state.setMenu,
  }));

  const menus = useMemo(
    () => tabs.find(tab => tab.key === selectedTab)?.menus || [],
    [tabs, selectedTab]
  );

  const handleMenuClick = (menu: Menu) => () => {
    const newTab = tabs.find(tab => tab.menus.includes(menu as Menu));

    if (newTab && newTab.key !== selectedTab) setTab(newTab.key as AboutTabKey, menu);
    setMenu(menu as Menu);
  };

  return (
    <>
      <div className='block px-6 lg:hidden'>
        <Accordion type='single' collapsible className='flex w-full flex-col gap-1 sm:flex-row'>
          {tabs.map(tab => {
            const tabMenus = tab.menus;
            const tabName = tab.name;

            return (
              <AccordionItem key={tab.key} value={tab.key} className='flex-1'>
                <AccordionTrigger className='rounded-none bg-gray-300 px-4 dark:bg-slate-700'>
                  {tabName}
                </AccordionTrigger>
                <AccordionContent className='border border-gray-300 pb-0 dark:border-slate-700'>
                  {tabMenus.map((menu, idx) => {
                    const menuName = categoryAboutData.find(item => item.key === menu)?.name || '';

                    return (
                      <MenuItem
                        key={menu}
                        menu={menu as Menu}
                        menuName={menuName}
                        selectedMenu={selectedMenu}
                        folderColor={folderColors[idx]}
                        onMenuClick={handleMenuClick}
                      />
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <div className='hidden lg:block'>
        {menus.map((menu, idx) => {
          const menuName = categoryAboutData.find(item => item.key === menu)?.name || '';

          return (
            <MenuItem
              key={menu}
              menu={menu as Menu}
              menuName={menuName}
              selectedMenu={selectedMenu}
              folderColor={folderColors[idx]}
              onMenuClick={handleMenuClick}
            />
          );
        })}
      </div>
    </>
  );
};

export default SidebarContent;
