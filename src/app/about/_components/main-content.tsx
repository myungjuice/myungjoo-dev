import { useMemo } from 'react';

import CodeHighlight from '@/components/shared/code-highlight';
import { getAboutPageData } from '@/constants/about';
import { useAboutPageStore } from '@/store/use-about-page-store';
import { useLangStore } from '@/store/use-lang-store';
import type { Themes } from '@/types/code-highlight';

const themes: Themes = {
  dark: 'slack-dark',
  light: 'light-plus',
};

const MainContent = () => {
  const aboutPageData = getAboutPageData();

  const { selectedTab, selectedMenu } = useAboutPageStore(state => ({
    selectedTab: state.selectedTab,
    selectedMenu: state.selectedMenu,
  }));

  useLangStore(state => ({
    lang: state.lang,
  }));

  const contents = useMemo(
    () => aboutPageData[selectedTab].menu[selectedMenu],
    [selectedTab, selectedMenu, aboutPageData]
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
