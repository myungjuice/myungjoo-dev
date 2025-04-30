import { Button } from '@/components/ui/button';
import { tabIconMap } from '@/constants/about';
import { cn } from '@/lib/utils';
import { useAboutPageStore } from '@/store/use-about-page-store';
import type { AboutTabKey } from '@/types/about';

type Props = {
  tabs: AboutTabKey[];
};

const SidebarTab = ({ tabs }: Props) => {
  const { selectedTab, setTab } = useAboutPageStore(state => ({
    selectedTab: state.selectedTab,
    setTab: state.setTab,
  }));

  const handleTabClick = (tab: AboutTabKey) => () => {
    setTab(tab);
  };

  return (
    <div className='hidden flex-col gap-2 border-r border-slate-400 px-2 py-4 lg:flex dark:border-slate-700'>
      {tabs.map(tab => {
        const Icon = tabIconMap[tab];

        return (
          <Button
            variant='ghost'
            size='lg'
            className='w-full'
            key={tab}
            onClick={handleTabClick(tab)}
          >
            <Icon
              className={cn(
                'size-6 text-slate-400 dark:text-slate-400',
                selectedTab === tab && 'text-slate-900 dark:text-slate-100'
              )}
            />
          </Button>
        );
      })}
    </div>
  );
};

export default SidebarTab;
