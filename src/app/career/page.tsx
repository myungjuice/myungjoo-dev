import type { Metadata } from 'next';

import { shared, page } from '@/constants/metadata';

import Career from './_components/career';

export const metadata: Metadata = {
  title: page.career.title,
  description: page.career.description,
  openGraph: {
    title: page.career.title,
    description: page.career.description,
    url: page.career.url,
    images: [shared.ogImage],
    siteName: shared.siteName,
    type: shared.type,
  },
  twitter: {
    card: shared.twitterCard,
    title: page.career.title,
    description: page.career.description,
    images: [shared.ogImage],
  },
};

const CareerPage = () => <Career />;

export default CareerPage;
