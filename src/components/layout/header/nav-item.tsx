'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { activeLinkClass, baseLinkClass } from '@/constants/header';
import { cn } from '@/lib/utils';

type NavItemProps = {
  href: string;
  label: string;
  isMobile?: boolean;
  onClick?: () => void;
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

export default NavItem;
