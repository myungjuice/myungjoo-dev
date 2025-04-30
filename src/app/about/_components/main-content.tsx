import CodeHighlight from '@/components/shared/code-highlight';
import FadeInUp from '@/components/shared/fade-in-up';
import type { Themes } from '@/types/code-highlight';

type Props = {
  contents: string;
  isFetching: boolean;
};

const themes: Themes = {
  dark: 'slack-dark',
  light: 'light-plus',
};

const MainContent = ({ contents, isFetching }: Props) => (
  <div className='flex-2 p-6'>
    <FadeInUp>
      <CodeHighlight
        rawCode={contents}
        className='bg-transparent dark:bg-transparent'
        themes={themes}
        isFetching={isFetching}
      />
    </FadeInUp>
  </div>
);

export default MainContent;
