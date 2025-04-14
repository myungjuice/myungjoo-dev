import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import React from 'react';

import Layout from '@/components/layout';
import ThemeProvider from '@/providers/themeProvider';

import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "MJ's Portfolio",
  description: 'Introduce myself',
};

const setInitialTheme = `
  (function() {
    try {
      const stored = localStorage.getItem('themeStore');
      const isDark = JSON.parse(stored || '{}')?.state?.isDarkMode;
      if (isDark) {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  })();
`;

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html suppressHydrationWarning lang='en'>
    <head>
      <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
    </head>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ThemeProvider>
        <Layout>{children}</Layout>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
