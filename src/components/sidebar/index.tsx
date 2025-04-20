import { cva } from 'class-variance-authority';
import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

import SidebarContainer from './sidebar-container';
import SidebarTab from './sidebar-tab';

const sidebarVariants = cva(
  'flex h-full w-full border-slate-400 lg:border-r dark:border-slate-700',
  {
    variants: {
      size: {
        md: 'lg:w-[226px]',
        lg: 'lg:w-[300px]',
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
  <aside className={cn(sidebarVariants({ size, className }))}>{children}</aside>
);

Sidebar.Tab = SidebarTab;
Sidebar.Container = SidebarContainer;

export default Sidebar;
