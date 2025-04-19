import { Button } from '@/components/ui/button';
import { aboutPageData } from '@/constants/about';
import { cn } from '@/lib/utils';
import { useAboutPageStore } from '@/store/use-about-page-store';
import type { AboutTabKey } from '@/types/about';

const tabEntries = Object.entries(aboutPageData);

const SidebarTab = () => {
  const { selectedTab, setTab } = useAboutPageStore(state => ({
    selectedTab: state.selectedTab,
    setTab: state.setTab,
  }));

  const handleTabClick = (key: string) => () => {
    setTab(key as AboutTabKey);
  };

  return (
    <div className='hidden flex-col gap-2 border-r border-slate-400 px-2 py-4 lg:flex dark:border-slate-700'>
      {tabEntries.map(([key, value]) => (
        <Button
          variant='ghost'
          size='lg'
          className='w-full'
          key={key}
          onClick={handleTabClick(key)}
        >
          <value.icon
            className={cn(
              'size-6 text-slate-400 dark:text-slate-400',
              selectedTab === key && 'text-slate-900 dark:text-slate-100'
            )}
          />
        </Button>
      ))}
    </div>
  );
};

export default SidebarTab;
