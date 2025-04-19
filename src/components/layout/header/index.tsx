'use client';

import React from 'react';

import HeaderDesktop from './header-desktop';
import HeaderMobile from './header-mobile';

const Header = () => (
  <header className='sticky top-0 z-50 min-h-14'>
    <div className='hidden h-full lg:block'>
      <HeaderDesktop />
    </div>
    <div className='h-full lg:hidden'>
      <HeaderMobile />
    </div>
  </header>
);

export default Header;
