import { useShallow } from 'zustand/react/shallow';

import { createStore } from '.';

type ProjectsPageStore = {
  techs: string[];
  selectedTechs: string[];
  setTechs: (techs: string[]) => void;
  toggleTech: (tech: string) => void;
  setInitialTechs: (techs: string[]) => void;
};

const initialState = {
  techs: [],
  selectedTechs: [],
};

export const projectsPageStore = createStore<ProjectsPageStore>(
  set => ({
    ...initialState,
    setTechs: (techs: string[]) => {
      set({ techs });
    },
    setInitialTechs: (techs: string[]) => {
      set({ selectedTechs: techs });
    },
    toggleTech: tech => {
      set(state => {
        const exists = state.selectedTechs.includes(tech);
        const next = exists
          ? state.selectedTechs.filter(item => item !== tech)
          : [...state.selectedTechs, tech];

        return {
          selectedTechs: next,
        };
      });
    },
  }),
  'projectsPageStore',
  false
);

export const useProjectsPageStore = <T>(selector: (state: ProjectsPageStore) => T): T =>
  projectsPageStore(useShallow(selector));
