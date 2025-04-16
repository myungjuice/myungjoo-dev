'use client';

import { Moon, Sun, SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'system';

const themes: Record<Theme, React.ReactNode> = {
  light: <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all' />,
  dark: <Moon className='h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:rotate-0' />,
  system: <SunMoon className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all' />,
};

const ThemeDropdownButton = () => {
  const { theme, setTheme } = useTheme();

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
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(theme === 'dark' && 'bg-muted')}
          onClick={handleThemeChange('dark')}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(theme === 'system' && 'bg-muted')}
          onClick={handleThemeChange('system')}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeDropdownButton;
