import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { aboutTabKoMap } from '@/constants/about';
import { folderColors } from '@/constants/folder-colors';
import { useAboutPageStore } from '@/store/use-about-page-store';
import type { Menu, AboutTabKey, AboutCategory } from '@/types/about';

import MenuItem from './menu-item';

type Props = {
  tabs: AboutCategory[];
};

const SidebarContent = ({ tabs }: Props) => {
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

  const {
    i18n: { language },
  } = useTranslation();

  const handleMenuClick = (menu: string) => () => {
    const newTab = tabs.find(tab => tab.menus.includes(menu as Menu));

    if (newTab && newTab.key !== selectedTab) setTab(newTab.key as AboutTabKey);
    setMenu(menu as Menu);
  };

  return (
    <>
      <div className='block px-6 lg:hidden'>
        <Accordion type='single' collapsible className='flex w-full flex-col gap-1 sm:flex-row'>
          {tabs.map(tab => {
            const tabMenus = tab.menus;

            return (
              <AccordionItem key={tab.key} value={tab.key} className='flex-1'>
                <AccordionTrigger className='rounded-none bg-gray-300 px-4 dark:bg-slate-700'>
                  {language === 'ko' ? aboutTabKoMap[tab.key as AboutTabKey] : tab.key}
                </AccordionTrigger>
                <AccordionContent className='border border-gray-300 pb-0 dark:border-slate-700'>
                  {tabMenus.map((menu, idx) => (
                    <MenuItem
                      key={menu}
                      menu={menu as Menu}
                      selectedMenu={selectedMenu}
                      folderColor={folderColors[idx]}
                      onMenuClick={handleMenuClick}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <div className='hidden lg:block'>
        {menus.map((menu, idx) => (
          <MenuItem
            key={menu}
            menu={menu as Menu}
            selectedMenu={selectedMenu}
            folderColor={folderColors[idx]}
            onMenuClick={handleMenuClick}
          />
        ))}
      </div>
    </>
  );
};

export default SidebarContent;
