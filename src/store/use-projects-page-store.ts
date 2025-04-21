import { useShallow } from 'zustand/react/shallow';

import { techList } from '@/constants/projects';
import type { Tech } from '@/types/projects';

import { createStore } from '.';

type ProjectsPageStore = {
  selectedTechs: Tech[];
  toggleTech: (tech: Tech) => void;
};

const initialState = {
  selectedTechs: [...Object.keys(techList)] as Tech[],
};

export const projectsPageStore = createStore<ProjectsPageStore>(
  set => ({
    ...initialState,
    toggleTech: tech => {
      set(state => {
        const exists = state.selectedTechs.includes(tech);
        return {
          selectedTechs: exists
            ? state.selectedTechs.filter(item => item !== tech)
            : [...state.selectedTechs, tech],
        };
      });
    },
  }),
  'projectsPageStore',
  false
);

export const useProjectsPageStore = <T>(selector: (state: ProjectsPageStore) => T): T =>
  projectsPageStore(useShallow(selector));
