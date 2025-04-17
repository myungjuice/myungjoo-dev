import { ReactNode } from 'react';

import Footer from './footer';
import Header from './header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div className='min-w-96 bg-white p-4 sm:p-10 dark:bg-slate-950'>
    <div className='mx-auto flex min-h-[calc(100vh-32px)] max-w-[2560px] flex-col rounded-lg border border-slate-400 bg-gray-100 sm:min-h-[calc(100vh-80px)] dark:border-slate-700 dark:bg-slate-900'>
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  </div>
);

export default Layout;
