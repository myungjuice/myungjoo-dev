import { useShallow } from 'zustand/react/shallow';

import { techList } from '@/constants/projects';
import { sortByReference } from '@/lib/utils';
import type { Tech } from '@/types/projects';

import { createStore } from '.';

type ProjectsPageStore = {
  selectedTechs: Tech[];
  toggleTech: (tech: Tech) => void;
};

const initialState = {
  selectedTechs: techList,
};

export const projectsPageStore = createStore<ProjectsPageStore>(
  set => ({
    ...initialState,
    toggleTech: tech => {
      set(state => {
        const exists = state.selectedTechs.includes(tech);
        const next = exists
          ? state.selectedTechs.filter(item => item !== tech)
          : [...state.selectedTechs, tech];

        return {
          selectedTechs: sortByReference(next, techList),
        };
      });
    },
  }),
  'projectsPageStore',
  false
);

export const useProjectsPageStore = <T>(selector: (state: ProjectsPageStore) => T): T =>
  projectsPageStore(useShallow(selector));
