import { useMemo } from 'react';

import { aboutPageData } from '@/constants/about';
import { useAboutPageStore } from '@/store/use-about-page-store';

const MainContent = () => {
  const { selectedTab, selectedMenu } = useAboutPageStore(state => ({
    selectedTab: state.selectedTab,
    selectedMenu: state.selectedMenu,
  }));

  const contents = useMemo(
    () => aboutPageData[selectedTab].menu[selectedMenu],
    [selectedTab, selectedMenu]
  );

  return (
    <div className='flex-1 p-6'>
      <p>{contents}</p>
    </div>
  );
};

export default MainContent;
