import { ReactNode } from 'react';

import Footer from './footer';
import Header from './header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className='flex min-w-96 flex-col'>
    <Header />
    <main className='mx-auto min-h-[calc(100vh-130px)] max-w-screen-2xl flex-1 p-6'>
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
