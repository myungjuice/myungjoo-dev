import { useMemo } from 'react';

import CodeHighlight from '@/components/shared/code-highlight';
import { aboutPageData } from '@/constants/about';
import { useAboutPageStore } from '@/store/use-about-page-store';
import type { Themes } from '@/types/code-highlight';

const themes: Themes = {
  dark: 'slack-dark',
  light: 'light-plus',
};

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
    <div className='flex-2 p-6'>
      <CodeHighlight
        rawCode={contents || ''}
        className='bg-transparent dark:bg-transparent'
        themes={themes}
      />
    </div>
  );
};

export default MainContent;
