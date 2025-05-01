import type { Metadata } from 'next';
import { Suspense } from 'react';

import Spinner from '@/components/ui/spinner';
import { shared, page } from '@/constants/metadata';
import { fetchCareer } from '@/lib/api/career';
import { getLangFromCookie } from '@/lib/get-lang-from-cookie';
import type { Language } from '@/types/language';

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

const CareerPage = async () => {
  const lang = (await getLangFromCookie()) as Language;
  const careerData = await fetchCareer({ lang, key: ['all'] });
  const initialKeys = careerData.map(item => item.key);
  const initialCareerNames = careerData.map(item => ({
    key: item.key,
    name: item.name,
  }));

  return (
    <Suspense
      fallback={
        <div className='flex h-full flex-col items-center justify-center gap-5 px-4 py-10 xl:gap-8'>
          <Spinner size='md' />
        </div>
      }
    >
      <Career
        initialLang={lang}
        initialData={careerData}
        initialKeys={initialKeys}
        initialCareerNames={initialCareerNames}
      />
    </Suspense>
  );
};

export default CareerPage;
