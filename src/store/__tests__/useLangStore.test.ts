import { act } from 'react';

import i18n from '@/lib/i18n/client';

import { useLangStore } from '../useLangStore';

jest.mock('@/lib/i18n/client', () => ({
  __esModule: true,
  default: {
    changeLanguage: jest.fn(),
  },
}));

describe('useLangStore', () => {
  beforeEach(() => {
    const { setLang } = useLangStore.getState();
    setLang('ko');
    jest.clearAllMocks();
  });

  it('초기 상태는 ko여야 한다', () => {
    const { lang } = useLangStore.getState();
    expect(lang).toBe('ko');
  });

  it('setLang 호출 시 상태가 변경되고 i18n.changeLanguage도 호출된다', () => {
    act(() => {
      useLangStore.getState().setLang('en');
    });

    const { lang } = useLangStore.getState();
    expect(lang).toBe('en');
    expect(i18n.changeLanguage).toHaveBeenCalledWith('en');
  });
});
