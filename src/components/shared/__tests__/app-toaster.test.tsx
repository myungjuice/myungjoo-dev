import { render } from '@testing-library/react';

import AppToaster from '../app-toaster';

const mockToaster = jest.fn();
let mockResolvedTheme: string | undefined = 'dark';

jest.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: mockResolvedTheme }),
}));

jest.mock('sonner', () => ({
  Toaster: (props: unknown) => {
    mockToaster(props);

    return <div />;
  },
}));

describe('AppToaster 컴포넌트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockResolvedTheme = 'dark';
  });

  it('해석된 사이트 테마와 Sonner 수명 주기 설정을 전달한다', () => {
    render(<AppToaster />);

    const toasterProps = mockToaster.mock.calls[0][0];

    expect(toasterProps).toMatchObject({
      theme: 'dark',
      position: 'top-center',
      duration: 3000,
    });
    expect(toasterProps).not.toHaveProperty('richColors');
    expect(toasterProps).not.toHaveProperty('style');
    expect(toasterProps).not.toHaveProperty('toastOptions');
  });

  it('해석할 수 없는 테마에는 system을 전달한다', () => {
    mockResolvedTheme = 'custom';

    render(<AppToaster />);

    expect(mockToaster.mock.calls[0][0]).toMatchObject({ theme: 'system' });
  });
});
