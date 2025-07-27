import { useShallow } from 'zustand/react/shallow';

import { careerFilterList } from '@/constants/career';
import { sortByReference } from '@/lib/utils';
import type { CareerFilterItem } from '@/types/career';

import { createStore } from '.';

type CareerPageStore = {
  selectedFilter: CareerFilterItem[];
  toggleFilter: (filter: CareerFilterItem) => void;
};

const initialState = {
  selectedFilter: [...careerFilterList],
};

export const careerPageStore = createStore<CareerPageStore>(
  set => ({
    ...initialState,
    toggleFilter: filter => {
      set(state => {
        const exists = state.selectedFilter.includes(filter);
        const next = exists
          ? state.selectedFilter.filter(item => item !== filter)
          : [...state.selectedFilter, filter];

        return {
          selectedFilter: sortByReference(next, careerFilterList),
        };
      });
    },
  }),
  'careerPageStore',
  false
);

export const useCareerPageStore = <T>(selector: (state: CareerPageStore) => T): T =>
  careerPageStore(useShallow(selector));
