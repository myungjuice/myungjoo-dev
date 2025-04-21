import type { Metadata } from 'next';
import { Fira_Code } from 'next/font/google';
import { type PropsWithChildren } from 'react';

import Layout from '@/components/layout';
import { shared, page } from '@/constants/metadata';
import Providers from '@/providers';

import '@/styles/globals.css';

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fira',
  display: 'swap',
});

export const metadata: Metadata = {
  title: page.root.title,
  description: page.root.description,
  openGraph: {
    title: page.root.title,
    description: page.root.description,
    url: page.root.url,
    images: [shared.ogImage],
    siteName: shared.siteName,
    type: shared.type,
  },
  twitter: {
    card: shared.twitterCard,
    title: page.root.title,
    description: page.root.description,
    images: [shared.ogImage],
  },
};

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => (
  <html lang='en'>
    <body className={`${firaCode.variable} antialiased`}>
      <Providers>
        <Layout>{children}</Layout>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
