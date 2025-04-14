import { act } from '@testing-library/react';

import { useCountStore } from './useCountStore';

describe('useCountStore', () => {
  beforeEach(() => {
    useCountStore.setState({ count: 0 });
  });

  it('초기 값은 0이다', () => {
    expect(useCountStore.getState().count).toBe(0);
  });

  it('increase 함수를 호출하면 count가 증가한다', () => {
    act(() => {
      useCountStore.getState().increase();
    });
    expect(useCountStore.getState().count).toBe(1);
  });

  it('decrease 함수를 호출하면 count가 감소한다', () => {
    act(() => {
      useCountStore.getState().decrease();
    });
    expect(useCountStore.getState().count).toBe(-1);
  });

  it('reset 함수를 호출하면 count가 0으로 초기화된다', () => {
    act(() => {
      useCountStore.setState({ count: 5 });
      useCountStore.getState().reset();
    });
    expect(useCountStore.getState().count).toBe(0);
  });
});
