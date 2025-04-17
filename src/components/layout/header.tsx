'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import LanguageToggle from '@/components/shared/language-toggle';
import ThemeDropdownButton from '@/components/shared/theme-dropdown-button';
import { cn } from '@/lib/utils';

type Link = {
  href: string;
  label: string;
};

const navLinks: Link[] = [
  { href: '/', label: '_hello' },
  { href: '/about', label: '_about-me' },
  { href: '/career', label: '_career' },
  { href: '/contact', label: '_contact-me' },
];

const LogoTitle = ({ children }: PropsWithChildren) => (
  <span className='text-body-md text-slate-500 duration-200 dark:text-slate-400'>{children}</span>
);

const HeaderDesktop = () => {
  const pathname = usePathname();
  const { t } = useTranslation('header');

  return (
    <div className='flex h-14 w-full items-center gap-4 px-4'>
      <div className='w-36 shrink-0'>
        <LogoTitle>{t('title')}</LogoTitle>
      </div>

      <ul className='flex h-full flex-1 items-center border-r border-l border-slate-700'>
        {navLinks.map(link => (
          <li
            key={link.href}
            className={cn(
              'relative h-full transform border-r border-slate-700 px-4 text-body-md text-slate-500 duration-200 dark:text-slate-400',
              pathname !== link.href && 'hover:text-slate-700 dark:hover:text-slate-200',
              pathname === link.href && 'font-bold text-slate-900 dark:text-slate-050'
            )}
          >
            <Link href={link.href} className='flex h-full w-full items-center'>
              {link.label}
            </Link>
            {pathname === link.href && (
              <div className='absolute -bottom-[1px] left-0 h-[3px] w-full bg-orange-300' />
            )}
          </li>
        ))}
      </ul>

      <div className='flex w-auto shrink-0 justify-end gap-2'>
        <LanguageToggle />
        <ThemeDropdownButton />
      </div>
    </div>
  );
};

const HeaderMobile = () => (
  <div className='flex items-center justify-between px-4'>
    <div>left</div>
    <div>right</div>
  </div>
);

const Header = () => (
  <header className='border-b border-slate-700'>
    <div className='hidden lg:block'>
      <HeaderDesktop />
    </div>

    <div className='lg:hidden'>
      <HeaderMobile />
    </div>
  </header>
);

export default Header;
