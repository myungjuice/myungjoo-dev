import { type ReactNode } from 'react';

import SidebarContent from './sidebar-content';
import SidebarTab from './sidebar-tab';

type Props = {
  children: ReactNode;
};

const Sidebar = ({ children }: Props) => (
  <aside className='flex h-full w-[300px] border-slate-400 lg:border-r dark:border-slate-700'>
    {children}
  </aside>
);

Sidebar.Tab = SidebarTab;
Sidebar.Content = SidebarContent;

export default Sidebar;
