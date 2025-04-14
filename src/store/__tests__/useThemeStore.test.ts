import { act } from 'react';

import { themeStore as useThemeStore } from '../use-theme-store';

describe('useThemeStore', () => {
  beforeEach(() => {
    useThemeStore.setState({ isDarkMode: false });
  });

  it('초기 상태는 isDarkMode: false이다', () => {
    const { isDarkMode } = useThemeStore.getState();
    expect(isDarkMode).toBe(false);
  });

  it('toggleDarkMode를 호출하면 isDarkMode가 true로 바뀐다', () => {
    act(() => {
      useThemeStore.getState().toggleDarkMode();
    });
    expect(useThemeStore.getState().isDarkMode).toBe(true);
  });

  it('두 번 호출하면 다시 false가 된다', () => {
    act(() => {
      useThemeStore.getState().toggleDarkMode();
      useThemeStore.getState().toggleDarkMode();
    });
    expect(useThemeStore.getState().isDarkMode).toBe(false);
  });
});
