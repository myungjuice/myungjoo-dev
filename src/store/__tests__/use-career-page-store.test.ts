import { act } from '@testing-library/react';

import { CareerFilterList } from '@/constants/career';
import type { CareerFilterItem } from '@/types/career';

import { careerPageStore } from '../use-career-page-store';

describe('careerPageStore 상태 테스트', () => {
  beforeEach(() => {
    act(() => {
      careerPageStore.setState({ selectedFilter: [...CareerFilterList] });
    });
  });

  it('초기 상태는 CareerFilterList와 동일해야 한다', () => {
    const state = careerPageStore.getState();
    expect(state.selectedFilter).toEqual(CareerFilterList);
  });

  it('toggleFilter를 호출하면 필터가 제거된다', () => {
    const testFilter: CareerFilterItem = CareerFilterList[0];

    act(() => {
      careerPageStore.getState().toggleFilter(testFilter);
    });

    const state = careerPageStore.getState();
    expect(state.selectedFilter).not.toContain(testFilter);
  });

  it('toggleFilter를 두 번 호출하면 필터가 다시 추가된다', () => {
    const testFilter: CareerFilterItem = CareerFilterList[0];

    act(() => {
      careerPageStore.getState().toggleFilter(testFilter);
      careerPageStore.getState().toggleFilter(testFilter);
    });

    const state = careerPageStore.getState();
    expect(state.selectedFilter).toContain(testFilter);
  });
});
