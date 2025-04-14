'use client';

import React from 'react';

import ThemeProvider from './themeProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => <ThemeProvider>{children}</ThemeProvider>;

export default Providers;
