import { Button } from '@/components/ui/button';
import { aboutPageData } from '@/constants/about';
import { useAboutPageStore } from '@/store/use-about-page-store';
import type { AboutTabKey } from '@/types/about';

const tabEntries = Object.entries(aboutPageData);

const SidebarTab = () => {
  const { selectedTab, setTab } = useAboutPageStore(state => ({
    selectedTab: state.selectedTab,
    setTab: state.setTab,
  }));

  return (
    <div className='hidden flex-col gap-2 border-r border-slate-400 px-2 py-4 lg:flex dark:border-slate-700'>
      {tabEntries.map(([key, value]) => (
        <Button
          variant={selectedTab === key ? 'outline' : 'ghost'}
          size='lg'
          className='w-full'
          key={key}
          onClick={() => setTab(key as AboutTabKey)}
        >
          <value.icon className='size-6 text-slate-700 dark:text-slate-400' />
        </Button>
      ))}
    </div>
  );
};

export default SidebarTab;
