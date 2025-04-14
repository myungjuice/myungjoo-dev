'use client';

import React, { useEffect } from 'react';

import useMounted from '@/hooks/useMounted';
import { useThemeStore } from '@/store/useThemeStore';

type Props = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const mounted = useMounted();

  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const setDarkMode = useThemeStore(state => state.setDarkMode);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('themeStore') || '{}');
    const isPersistDarkMode = stored?.state?.isDarkMode;

    if (isPersistDarkMode !== undefined && isPersistDarkMode !== isDarkMode) {
      setDarkMode(isPersistDarkMode);
    }
  }, [isDarkMode, setDarkMode]);

  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;

      if (isDarkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [isDarkMode, mounted]);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
};

export default ThemeProvider;
