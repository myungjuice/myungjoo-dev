import resume from '@/content/resume.json';
import type { CareerFilterItem } from '@/types/career';

const productionOrigin = resume.ko.links.website;

export type CareerLinkOptions = {
  slug: CareerFilterItem;
  projectId?: number;
  origin: string;
  environment: string | undefined;
};

export const createCareerLink = ({
  slug,
  projectId,
  origin,
  environment,
}: CareerLinkOptions): string => {
  const baseOrigin = environment === 'development' ? origin : productionOrigin;
  const path = `/career/${slug}`;
  const hash = projectId === undefined ? '' : `#project-${projectId}`;

  return `${baseOrigin}${path}${hash}`;
};
