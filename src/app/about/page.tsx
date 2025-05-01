import type { Metadata } from 'next';
import { Suspense } from 'react';

import Spinner from '@/components/ui/spinner';
import { shared, page } from '@/constants/metadata';
import { fetchAboutCategory, fetchAbout } from '@/lib/api/about';
import { getLangFromCookie } from '@/lib/get-lang-from-cookie';
import { AboutTabKey, Menu } from '@/types/about';
import { Language } from '@/types/language';

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
  const lang = (await getLangFromCookie()) as Language;
  const aboutCategoryData = await fetchAboutCategory({ lang });
  const tabs = aboutCategoryData.filter(item => item.type === 'tab');

  const aboutData = await fetchAbout({
    lang,
    tabKey: tabs[0].key as AboutTabKey,
    menuKey: tabs[0].menus[0] as Menu,
  });

  return (
    <Suspense
      fallback={
        <div className='flex h-full flex-col items-center justify-center gap-5 px-4 py-10 xl:gap-8'>
          <Spinner size='md' />
        </div>
      }
    >
      <About initialCategoryData={aboutCategoryData} initialData={aboutData} initialLang={lang} />
    </Suspense>
  );
};

export default AboutPage;
