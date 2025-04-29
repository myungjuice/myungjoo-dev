import type { Metadata } from 'next';

import { shared, page } from '@/constants/metadata';
import { fetchHello } from '@/lib/api/hello';
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
  const helloData = await fetchHello({ lang });

  return <Main initialData={helloData} />;
};

export default MainPage;
