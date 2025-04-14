'use client';

import React, { useEffect } from 'react';

import { useThemeStore } from '@/store/useThemeStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const toggleDarkMode = useThemeStore(state => state.toggleDarkMode);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('themeStore') || '{}');
    const isPersistDarkMode = stored?.state?.isDarkMode;
    const root = document.documentElement;

    if (isPersistDarkMode !== undefined && isPersistDarkMode !== isDarkMode) {
      toggleDarkMode();
      return;
    }

    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode, toggleDarkMode]);

  return <>{children}</>;
};

export default ThemeProvider;
