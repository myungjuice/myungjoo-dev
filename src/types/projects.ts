import type { IconType } from 'react-icons';

type Lang = 'ko' | 'en';

export type Tech = 'react';

export type TechIconMap = Record<Tech, IconType>;

export type ProjectName = 'portfolio';

export type ProjectItem = {
  id: number;
  tech: Tech;
  name: string;
  thumbnailUrl: string;
  description: string;
  githubUrl: string;
  githubButtonText: string;
};

export type ProjectData = Record<ProjectName, ProjectItem>;

export type ProjectTranslations = Record<Lang, ProjectData>;
