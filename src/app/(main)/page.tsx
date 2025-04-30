import type { Metadata } from 'next';
import { Suspense } from 'react';

import Spinner from '@/components/ui/spinner';
import { shared, page } from '@/constants/metadata';
import { fetchHello } from '@/lib/api/hello';
import { getLangFromCookie } from '@/lib/get-lang-from-cookie';
import { Language } from '@/types/language';

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
  const lang = (await getLangFromCookie()) as Language;
  const helloData = await fetchHello({ lang });

  return (
    <Suspense
      fallback={
        <div className='flex h-full flex-col items-center justify-center gap-5 px-4 py-10 xl:gap-8'>
          <Spinner size='md' />
        </div>
      }
    >
      <Main initialData={helloData} />
    </Suspense>
  );
};

export default MainPage;
