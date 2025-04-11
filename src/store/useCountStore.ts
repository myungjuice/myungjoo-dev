import { createStore } from './store';

interface CountStore {
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}

const initialState = {
  count: 0,
};

export const useCountStore = createStore<CountStore>(
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
