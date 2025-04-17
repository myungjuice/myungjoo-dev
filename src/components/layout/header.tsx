'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import LanguageToggle from '@/components/shared/language-toggle';
import ThemeDropdownButton from '@/components/shared/theme-dropdown-button';
import { navLinks, activeLinkClass, baseLinkClass } from '@/constants/nav-item';
import { cn } from '@/lib/utils';

type NavItemProps = {
  href: string;
  label: string;
  isMobile?: boolean;
  onClick?: () => void;
};

const LogoTitle = () => {
  const { t } = useTranslation('header');
  return (
    <Link
      href='/'
      className='flex h-full items-center text-body-md font-bold text-slate-500 dark:text-slate-400'
    >
      {t('title')}
    </Link>
  );
};

const NavItem = ({ href, label, isMobile = false, onClick }: NavItemProps) => {
  const pathname = usePathname();

  const isActive = useMemo(
    () => (href === '/' ? pathname === '/' : pathname.startsWith(href)),
    [href, pathname]
  );

  return (
    <li
      className={cn(
        isMobile
          ? 'relative flex h-11 items-center border-b border-slate-400 px-4 dark:border-slate-700'
          : 'relative flex h-full items-center border-r border-slate-400 px-4 dark:border-slate-700',
        isActive && (isMobile ? 'bg-slate-100 dark:bg-slate-800' : '')
      )}
    >
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          isMobile ? 'w-full' : 'flex h-full w-full items-center',
          baseLinkClass,
          isActive && activeLinkClass
        )}
      >
        {isMobile && (
          <span aria-hidden='true' className='opacity-0'>
            #{' '}
          </span>
        )}
        {label}
      </Link>

      {isActive &&
        (isMobile ? (
          <div className='absolute top-0 left-[-1px] h-full w-[3px] bg-orange-300' />
        ) : (
          <div className='absolute -bottom-[1px] left-0 h-[3px] w-full bg-orange-300' />
        ))}
    </li>
  );
};

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

const HeaderMobile = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('header');

  const toggleMenu = () => setOpen(prev => !prev);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className='relative h-14 w-full'>
      <div
        className={cn(
          'relative z-50 flex h-full w-full items-center justify-between rounded-t-lg border-slate-400 bg-gray-100 px-4 dark:border-slate-700 dark:bg-slate-900',
          'transition-all duration-200',
          open ? 'border' : 'border-b'
        )}
      >
        <LogoTitle />
        <button aria-label='Toggle menu' aria-expanded={open} onClick={toggleMenu}>
          {open ? (
            <X className='h-6 w-6 text-slate-500' />
          ) : (
            <Menu className='h-6 w-6 text-slate-500' />
          )}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className='fixed inset-0 z-40 bg-black/50 backdrop-blur-xs'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={closeMenu}
            />

            <motion.nav
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='absolute top-full left-0 z-50 w-full rounded-b-lg border-x border-b border-slate-400 bg-gray-100 pt-1 dark:border-slate-700 dark:bg-slate-900'
            >
              <ul>
                <li className='flex h-11 items-center border-b border-slate-400 px-4 text-body-md text-slate-600 dark:border-slate-700 dark:text-slate-400'>
                  # {t('mobile-menu-title')}:
                </li>
                {navLinks.map(link => (
                  <NavItem
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    onClick={closeMenu}
                    isMobile
                  />
                ))}
              </ul>

              <div className='flex items-center justify-between border-t border-slate-400 px-4 py-3 dark:border-slate-700'>
                <p className='flex items-center text-body-md text-slate-600 dark:text-slate-400'>
                  # {t('mobile-theme-preferences')}:
                </p>
                <div className='flex items-center gap-2'>
                  <LanguageToggle />
                  <ThemeDropdownButton />
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = () => (
  <header className='sticky top-0 z-50 h-14'>
    <div className='hidden h-full lg:block'>
      <HeaderDesktop />
    </div>
    <div className='h-full lg:hidden'>
      <HeaderMobile />
    </div>
  </header>
);

export default Header;
