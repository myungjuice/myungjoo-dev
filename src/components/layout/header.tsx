'use client';

import { Moon, Sun, Loader } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import useMounted from '@/hooks/useMounted';
import { useThemeStore } from '@/store/useThemeStore';

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  const mounted = useMounted();

  const icon = useMemo(
    () =>
      !mounted ? (
        <Loader className='h-5 w-5 animate-spin' />
      ) : isDarkMode ? (
        <Sun className='h-5 w-5' />
      ) : (
        <Moon className='h-5 w-5' />
      ),
    [isDarkMode, mounted]
  );

  return (
    <header className='w-full border-b py-3'>
      <div className='mx-auto flex max-w-screen-2xl items-center justify-between px-6'>
        <Link href='/' className='text-xl font-bold'>
          PORTFOLIO
        </Link>

        <Button
          onClick={toggleDarkMode}
          variant='outline'
          aria-label='Toggle dark mode'
          disabled={!mounted}
          size='icon'
          className='flex items-center gap-2 rounded transition'
        >
          {icon}
        </Button>
      </div>
    </header>
  );
};

export default Header;
