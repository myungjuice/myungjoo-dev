import type { Metadata } from 'next';

import { shared, page } from '@/constants/metadata';

import About from './_components/about';

export const metadata: Metadata = {
  title: page.about.title,
  description: page.about.description,
  openGraph: {
    title: page.about.title,
    description: page.about.description,
    url: page.about.url,
    images: [shared.ogImage],
    siteName: shared.siteName,
    type: shared.type,
  },
  twitter: {
    card: shared.twitterCard,
    title: page.about.title,
    description: page.about.description,
    images: [shared.ogImage],
  },
};

const AboutPage = () => <About />;

export default AboutPage;
