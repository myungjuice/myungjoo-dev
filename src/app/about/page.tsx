import type { Metadata } from 'next';

import { shared, page } from '@/constants/metadata';
import { fetchAboutCategory } from '@/lib/api/about';
import { getLangFromCookie } from '@/lib/get-lang-from-cookie';

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

const AboutPage = async () => {
  const lang = await getLangFromCookie();
  const aboutData = await fetchAboutCategory({ lang });

  const tabs = aboutData.filter(item => item.type === 'tab').map(item => item.key);

  return <About tabs={tabs} />;
};

export default AboutPage;
