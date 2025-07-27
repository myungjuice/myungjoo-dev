import { act } from '@testing-library/react';

import { careerFilterList } from '@/constants/career';
import type { CareerFilterItem } from '@/types/career';

import { careerPageStore } from '../use-career-page-store';

describe('careerPageStore 상태 테스트', () => {
  beforeEach(() => {
    act(() => {
      careerPageStore.setState({ selectedFilter: [...careerFilterList] });
    });
  });

  it('초기 상태는 careerFilterList와 동일해야 한다', () => {
    const state = careerPageStore.getState();
    expect(state.selectedFilter).toEqual(careerFilterList);
  });

  it('toggleFilter를 호출하면 필터가 제거된다', () => {
    const testFilter: CareerFilterItem = careerFilterList[0];

    act(() => {
      careerPageStore.getState().toggleFilter(testFilter);
    });

    const state = careerPageStore.getState();
    expect(state.selectedFilter).not.toContain(testFilter);
  });

  it('toggleFilter를 두 번 호출하면 필터가 다시 추가된다', () => {
    const testFilter: CareerFilterItem = careerFilterList[0];

    act(() => {
      careerPageStore.getState().toggleFilter(testFilter);
      careerPageStore.getState().toggleFilter(testFilter);
    });

    const state = careerPageStore.getState();
    expect(state.selectedFilter).toContain(testFilter);
  });
});
