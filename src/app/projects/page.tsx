import type { Metadata } from 'next';
import { Suspense } from 'react';

import Spinner from '@/components/ui/spinner';
import { shared, page } from '@/constants/metadata';
import { fetchProjects } from '@/lib/api/projects';
import { getLangFromCookie } from '@/lib/get-lang-from-cookie';
import type { Language } from '@/types/language';

import Projects from './_components/projects';

export const metadata: Metadata = {
  title: page.projects.title,
  description: page.projects.description,
  openGraph: {
    title: page.projects.title,
    description: page.projects.description,
    url: page.projects.url,
    images: [shared.ogImage],
    siteName: shared.siteName,
    type: shared.type,
  },
  twitter: {
    card: shared.twitterCard,
    title: page.projects.title,
    description: page.projects.description,
    images: [shared.ogImage],
  },
};

const ProjectsPage = async () => {
  const lang = (await getLangFromCookie()) as Language;
  const projectsData = await fetchProjects({ lang, tech: ['all'] });
  const initialTechs = Array.from(new Set(projectsData.flatMap(project => project.tech_stack)));

  return (
    <Suspense
      fallback={
        <div className='flex h-full flex-col items-center justify-center gap-5 px-4 py-10 xl:gap-8'>
          <Spinner size='md' />
        </div>
      }
    >
      <Projects initialLang={lang} initialData={projectsData} initialTechs={initialTechs} />
    </Suspense>
  );
};

export default ProjectsPage;
