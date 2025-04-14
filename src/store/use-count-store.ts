import { useShallow } from 'zustand/react/shallow';

import { createStore } from '.';

interface CountStore {
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}

const initialState = {
  count: 0,
};

export const countStore = createStore<CountStore>(
  set => ({
    ...initialState,
    increase: () => {
      set(state => {
        state.count += 1;
      });
    },
    decrease: () => {
      set(state => {
        state.count -= 1;
      });
    },
    reset: () => set(() => ({ ...initialState })),
  }),
  'countStore'
);

export const useCountStore = <T>(selector: (state: CountStore) => T): T =>
  countStore(useShallow(selector));
