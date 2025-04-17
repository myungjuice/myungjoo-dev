import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import LanguageToggle from '@/components/shared/language-toggle';
import ThemeDropdownButton from '@/components/shared/theme-dropdown-button';
import { navLinks, overlayAnimation, menuAnimation } from '@/constants/header';
import { cn } from '@/lib/utils';

import LogoTitle from './logo-title';
import NavItem from './nav-item';

const HeaderMobile = () => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation('header');

  const handleMenuToggle = (isOpen: boolean) => () => {
    setOpen(isOpen);
  };

  const setBodyScroll = (isOpen: boolean) => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  useEffect(() => {
    setBodyScroll(open);
    return () => setBodyScroll(false);
  }, [open]);

  return (
    <div className='relative h-14 w-full'>
      <div
        className={cn(
          'relative z-50 flex h-full w-full items-center justify-between rounded-t-lg border-slate-400 bg-gray-100 px-4 dark:border-slate-700 dark:bg-slate-900',
          open ? 'border' : 'border-b'
        )}
      >
        <LogoTitle />
        <button
          aria-label='Toggle menu'
          aria-expanded={open}
          aria-controls='mobile-menu'
          onClick={handleMenuToggle(!open)}
        >
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
              {...overlayAnimation}
              className='fixed inset-0 z-40 bg-black/50 backdrop-blur-xs'
              onClick={handleMenuToggle(false)}
            />

            <motion.nav
              {...menuAnimation}
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
                    onClick={handleMenuToggle(false)}
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

export default HeaderMobile;
