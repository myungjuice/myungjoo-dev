import { useShallow } from 'zustand/react/shallow';

import type { CareerFilterItem, CareerName } from '@/types/career';

import { createStore } from '.';

type CareerPageStore = {
  selectedFilter: CareerFilterItem[];
  careerNames: CareerName[];
  setInitialKeys: (keys: CareerFilterItem[]) => void;
  setCareerNames: (names: CareerName[]) => void;
  toggleFilter: (filter: CareerFilterItem) => void;
};

const initialState = {
  selectedFilter: [],
  careerNames: [],
};

export const careerPageStore = createStore<CareerPageStore>(
  set => ({
    ...initialState,
    setInitialKeys: (keys: CareerFilterItem[]) => {
      set(() => ({
        selectedFilter: keys,
      }));
    },
    setCareerNames: (names: CareerName[]) => {
      set(() => ({
        careerNames: names,
      }));
    },
    toggleFilter: filter => {
      set(state => {
        const exists = state.selectedFilter.includes(filter);
        let selectedFilter = exists
          ? state.selectedFilter.filter(item => item !== filter)
          : [...state.selectedFilter, filter];

        if (state.careerNames.length > 0) {
          selectedFilter = selectedFilter.sort(
            (a, b) =>
              state.careerNames.findIndex(name => name.key === a) -
              state.careerNames.findIndex(name => name.key === b)
          );
        }

        return { selectedFilter };
      });
    },
  }),
  'careerPageStore',
  false
);

export const useCareerPageStore = <T>(selector: (state: CareerPageStore) => T): T =>
  careerPageStore(useShallow(selector));
