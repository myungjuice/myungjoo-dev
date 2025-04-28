import { headers } from 'next/headers';

import { getLangFromCookie } from '../get-lang-from-cookie';

jest.mock('next/headers', () => ({
  headers: jest.fn(),
}));

describe('getLangFromCookie', () => {
  it('쿠키가 없을 경우 기본 언어 "ko"를 반환해야 합니다', async () => {
    (headers as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    const lang = await getLangFromCookie();
    expect(lang).toBe('ko');
  });

  it('NEXT_LANG 쿠키에서 언어를 반환해야 합니다', async () => {
    (headers as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('NEXT_LANG=en;'),
    });

    const lang = await getLangFromCookie();
    expect(lang).toBe('en');
  });

  it('NEXT_LANG 쿠키가 설정되지 않은 경우 기본 언어 "ko"를 반환해야 합니다', async () => {
    (headers as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('OTHER_COOKIE=value;'),
    });

    const lang = await getLangFromCookie();
    expect(lang).toBe('ko');
  });
});
