import { ReactNode } from 'react';

import Footer from './footer';
import Header from './header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className='min-w-96 bg-white p-4 sm:p-8 lg:p-12 dark:bg-slate-950'>
    <div className='mx-auto min-h-[calc(100vh-96px)] max-w-[2560px] rounded-lg border border-slate-400 bg-gray-100 dark:border-slate-700 dark:bg-slate-900'>
      <Header />
      <main className='py-4'>{children}</main>
      <Footer />
    </div>
  </div>
);

export default Layout;
