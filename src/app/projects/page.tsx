import type { Metadata } from 'next';

import { shared, page } from '@/constants/metadata';

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

const ProjectsPage = () => <Projects />;

export default ProjectsPage;
