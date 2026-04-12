import { cva } from 'class-variance-authority';
import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

import SidebarContainer from './sidebar-container';
import SidebarTab from './sidebar-tab';

const sidebarVariants = cva(
  'flex w-full flex-col border-slate-400 lg:self-stretch lg:border-r dark:border-slate-700 lg:items-start',
  {
    variants: {
      // HINT: flex 자식이 기본 shrink-1 이라 lg에서 본문에 밀려 폭이 거의 0까지 줄어 한 글자씩 세로로 깨짐 → min-w + shrink-0
      size: {
        md: 'lg:w-[260px] lg:min-w-[260px] lg:max-w-[260px] lg:shrink-0',
        lg: 'lg:w-[300px] lg:min-w-[300px] lg:max-w-[300px] lg:shrink-0',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  }
);

type Size = 'md' | 'lg';

type Props = {
  size?: Size;
  className?: string;
};

const Sidebar = ({ size, className, children }: PropsWithChildren<Props>) => (
  <aside className={cn(sidebarVariants({ size, className }))}>
    <div className='flex w-full flex-row lg:sticky lg:top-0 lg:z-5 lg:self-start'>{children}</div>
  </aside>
);

Sidebar.Tab = SidebarTab;
Sidebar.Container = SidebarContainer;

export default Sidebar;
