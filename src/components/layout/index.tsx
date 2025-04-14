import { ReactNode } from 'react';

import Footer from './footer';
import Header from './header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className='flex flex-col'>
    <Header />
    <main className='mx-auto min-h-screen max-w-screen-2xl flex-1 bg-gray-100 p-6'>{children}</main>
    <Footer />
  </div>
);

export default Layout;
