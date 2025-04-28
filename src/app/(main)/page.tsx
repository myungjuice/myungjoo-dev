import type { Metadata } from 'next';

import { shared, page } from '@/constants/metadata';
import { getLangFromCookie } from '@/lib/get-lang-from-cookie';

import Main from './_components/main';

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

const MainPage = async () => {
  const lang = await getLangFromCookie();
  console.log('NEXT_LANG 쿠키 값:', lang);

  return <Main />;
};

export default MainPage;
