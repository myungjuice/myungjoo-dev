import { renderHook, act } from '@testing-library/react';

import { initialTab, initialMenu } from '@/constants/about';

import { useAboutPageStore } from '../use-about-page-store';

describe('useAboutPageStore', () => {
  it('초기 상태를 올바르게 반환해야 한다', () => {
    const { result } = renderHook(() =>
      useAboutPageStore(state => ({
        selectedTab: state.selectedTab,
        selectedMenu: state.selectedMenu,
      }))
    );

    expect(result.current.selectedTab).toBe(initialTab);
    expect(result.current.selectedMenu).toBe(initialMenu);
  });

  it('setTab 호출 시 관련 상태가 업데이트 되어야 한다', () => {
    const { result } = renderHook(() =>
      useAboutPageStore(state => ({
        selectedTab: state.selectedTab,
        selectedMenu: state.selectedMenu,
        setTab: state.setTab,
      }))
    );

    act(() => {
      result.current.setTab('hobbies');
    });

    expect(result.current.selectedTab).toBe('hobbies');
    expect(result.current.selectedMenu).toBe('sports');
  });

  it('setMenu 호출 시 selectedMenu가 업데이트 되어야 한다', () => {
    const { result } = renderHook(() =>
      useAboutPageStore(state => ({
        selectedTab: state.selectedTab,
        selectedMenu: state.selectedMenu,
        setMenu: state.setMenu,
      }))
    );

    act(() => {
      result.current.setMenu('hard-skills');
    });

    expect(result.current.selectedMenu).toBe('hard-skills');
  });

  it('reset 호출 시 초기 상태로 되돌아가야 한다', () => {
    const { result } = renderHook(() =>
      useAboutPageStore(state => ({
        selectedTab: state.selectedTab,
        selectedMenu: state.selectedMenu,
        setTab: state.setTab,
        setMenu: state.setMenu,
        reset: state.reset,
      }))
    );

    act(() => {
      result.current.setTab('hobbies');
      result.current.setMenu('favorite-games');
    });

    expect(result.current.selectedTab).toBe('hobbies');
    expect(result.current.selectedMenu).toBe('favorite-games');

    act(() => {
      result.current.reset();
    });

    expect(result.current.selectedTab).toBe(initialTab);
    expect(result.current.selectedMenu).toBe(initialMenu);
  });
});
