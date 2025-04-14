import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const createStore = <T extends object>(
  initializer: StateCreator<T, [['zustand/devtools', never], ['zustand/immer', never]], []>,
  storeName: string,
  withPersist = false
) => {
  const base = devtools(immer(initializer), {
    name: storeName,
    enabled: process.env.NEXT_PUBLIC_ENV === 'development',
  });

  const enhanced = withPersist ? persist(base, { name: storeName, skipHydration: true }) : base;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return create(enhanced);
};
