'use client';

import { useTheme } from 'next-themes';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSun, FiMoon } from 'react-icons/fi';
import { TbSunMoon } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'system';

const themes: Record<Theme, ReactNode> = {
  light: <FiSun className='h-[1.2rem] w-[1.2rem] rotate-0 transition-all' />,
  dark: <FiMoon className='h-[1.2rem] w-[1.2rem] rotate-0 transition-all' />,
  system: <TbSunMoon className='h-[1.2rem] w-[1.2rem] rotate-0 transition-all' />,
};

const ThemeDropdownButton = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation('header');

  const handleThemeChange = (newTheme: Theme) => () => {
    setTheme(newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          {themes[theme as Theme]}
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          className={cn(theme === 'light' && 'bg-muted')}
          onClick={handleThemeChange('light')}
        >
          {t('theme-light')}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(theme === 'dark' && 'bg-muted')}
          onClick={handleThemeChange('dark')}
        >
          {t('theme-dark')}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(theme === 'system' && 'bg-muted')}
          onClick={handleThemeChange('system')}
        >
          {t('theme-system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeDropdownButton;
