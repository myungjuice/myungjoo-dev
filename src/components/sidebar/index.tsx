import { type ReactNode } from 'react';

import SidebarContent from './sidebar-content';
import SidebarTab from './sidebar-tab';

type Props = {
  children: ReactNode;
};

const Sidebar = ({ children }: Props) => (
  <aside className='flex h-full w-full border-slate-400 lg:w-[300px] lg:border-r dark:border-slate-700'>
    {children}
  </aside>
);

Sidebar.Tab = SidebarTab;
Sidebar.Content = SidebarContent;

export default Sidebar;
