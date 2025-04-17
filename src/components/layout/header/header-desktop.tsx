import LanguageToggle from '@/components/shared/language-toggle';
import ThemeDropdownButton from '@/components/shared/theme-dropdown-button';
import { navLinks } from '@/constants/header';

import LogoTitle from './logo-title';
import NavItem from './nav-item';

const HeaderDesktop = () => (
  <div className='relative flex h-full w-full items-center gap-4 rounded-t-lg border-b border-slate-400 bg-gray-100 px-4 dark:border-slate-700 dark:bg-slate-900'>
    <div className='w-36 shrink-0'>
      <LogoTitle />
    </div>
    <ul className='flex h-full flex-1 items-center border-x border-slate-400 dark:border-slate-700'>
      {navLinks.map(link => (
        <NavItem key={link.href} href={link.href} label={link.label} />
      ))}
    </ul>
    <div className='relative z-20 flex w-auto shrink-0 justify-end gap-2'>
      <LanguageToggle />
      <ThemeDropdownButton />
    </div>

    <a
      href={process.env.NEXT_PUBLIC_GITHUB_URL}
      className='absolute -top-10 -right-10 z-10'
      target='_blank'
      aria-label='View source on Github'
    >
      <svg
        width='80'
        height='80'
        viewBox='0 0 250 250'
        aria-hidden='true'
        className='fill-white text-green-500 dark:fill-slate-950 hover:[&_path.octo-arm]:animate-octocat-wave'
      >
        <path d='M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z' />
        <path
          d='M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2'
          className='octo-arm'
          fill='currentColor'
          style={{ transformOrigin: '130px 106px' }}
        />
        <path
          d='M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z'
          className='octo-body'
          fill='currentColor'
        />
      </svg>
    </a>
  </div>
);

export default HeaderDesktop;
