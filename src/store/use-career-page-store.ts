import { useShallow } from 'zustand/react/shallow';

import { CareerFilterList } from '@/constants/career';
import type { CareerFilterItem } from '@/types/career';

import { createStore } from '.';

type CareerPageStore = {
  selectedFilter: CareerFilterItem[];
  toggleFilter: (filter: CareerFilterItem) => void;
};

const initialState = {
  selectedFilter: [...CareerFilterList],
};

export const careerPageStore = createStore<CareerPageStore>(
  set => ({
    ...initialState,
    toggleFilter: filter => {
      set(state => {
        const exists = state.selectedFilter.includes(filter);
        return {
          selectedFilter: exists
            ? state.selectedFilter.filter(item => item !== filter)
            : [...state.selectedFilter, filter],
        };
      });
    },
  }),
  'careerPageStore',
  false
);

export const useCareerPageStore = <T>(selector: (state: CareerPageStore) => T): T =>
  careerPageStore(useShallow(selector));
