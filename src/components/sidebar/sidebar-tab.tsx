import { Button } from '@/components/ui/button';
import { tabIconMap } from '@/constants/about';
import { cn } from '@/lib/utils';
import { useAboutPageStore } from '@/store/use-about-page-store';
import type { AboutTabKey, AboutCategoryItem, Menu } from '@/types/about';

type Props = {
  tabs: AboutCategoryItem[];
};

const SidebarTab = ({ tabs }: Props) => {
  const { selectedTab, setTab } = useAboutPageStore(state => ({
    selectedTab: state.selectedTab,
    setTab: state.setTab,
  }));

  const handleTabClick = (newTab: AboutTabKey) => () => {
    const newMenu = tabs.find(tab => tab.key === newTab)?.menus[0];
    setTab(newTab, newMenu as Menu);
  };

  return (
    <div className='hidden flex-col gap-2 border-r border-slate-400 px-2 py-4 lg:flex dark:border-slate-700'>
      {tabs.map(tab => {
        const Icon = tabIconMap[tab.key as AboutTabKey];

        return (
          <Button
            variant='ghost'
            size='lg'
            className='w-full'
            key={tab.key}
            onClick={handleTabClick(tab.key as AboutTabKey)}
          >
            <Icon
              className={cn(
                'size-6 text-slate-400 dark:text-slate-400',
                selectedTab === tab.key && 'text-slate-900 dark:text-slate-100'
              )}
            />
          </Button>
        );
      })}
    </div>
  );
};

export default SidebarTab;
