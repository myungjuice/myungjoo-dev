import LanguageToggle from '@/components/shared/language-toggle';
import ThemeDropdownButton from '@/components/shared/theme-dropdown-button';
import { navLinks } from '@/constants/header';

import LogoTitle from './logo-title';
import NavItem from './nav-item';

const HeaderDesktop = () => (
  <div className='flex h-full w-full items-center gap-4 border-b border-slate-400 bg-gray-100 px-4 dark:border-slate-700 dark:bg-slate-900'>
    <div className='w-36 shrink-0'>
      <LogoTitle />
    </div>
    <ul className='flex h-full flex-1 items-center border-x border-slate-400 dark:border-slate-700'>
      {navLinks.map(link => (
        <NavItem key={link.href} href={link.href} label={link.label} />
      ))}
    </ul>
    <div className='flex w-auto shrink-0 justify-end gap-2'>
      <LanguageToggle />
      <ThemeDropdownButton />
    </div>
  </div>
);

export default HeaderDesktop;
