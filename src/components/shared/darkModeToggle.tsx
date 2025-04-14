'use client';

import { Moon, Sun, Loader } from 'lucide-react';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import useMounted from '@/hooks/useMounted';
import { useThemeStore } from '@/store/useThemeStore';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore(state => ({
    isDarkMode: state.isDarkMode,
    toggleDarkMode: state.toggleDarkMode,
  }));

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
  );
};

export default DarkModeToggle;
