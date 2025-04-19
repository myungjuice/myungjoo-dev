import { PropsWithChildren } from 'react';

import SidebarContainer from './sidebar-container';
import SidebarTab from './sidebar-tab';

const Sidebar = ({ children }: PropsWithChildren) => (
  <aside className='flex h-full w-full border-slate-400 lg:w-[300px] lg:border-r dark:border-slate-700'>
    {children}
  </aside>
);

Sidebar.Tab = SidebarTab;
Sidebar.Container = SidebarContainer;

export default Sidebar;
