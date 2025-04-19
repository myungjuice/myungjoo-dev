import { type ReactNode } from 'react';

import SidebarContainer from './sidebar-container';
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
Sidebar.Container = SidebarContainer;

export default Sidebar;
