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

  it('해석된 사이트 테마와 컴팩트한 Sonner 설정을 전달한다', () => {
    render(<AppToaster />);

    const toasterProps = mockToaster.mock.calls[0][0];

    expect(toasterProps).toMatchObject({
      theme: 'dark',
      position: 'top-center',
      duration: 3000,
      richColors: true,
      style: {
        '--width': 'fit-content',
        maxWidth: 'calc(100vw - 2rem)',
      },
    });
    expect(toasterProps.toastOptions.classNames.toast).toContain('!py-2');
    expect(toasterProps.toastOptions.classNames).toMatchObject({
      toast: expect.stringContaining('!min-h-0 !px-3 !py-2'),
      icon: '!size-4',
      content: '!gap-2',
      title: '!text-sm',
    });
  });

  it('해석할 수 없는 테마에는 system을 전달한다', () => {
    mockResolvedTheme = 'custom';

    render(<AppToaster />);

    expect(mockToaster.mock.calls[0][0]).toMatchObject({ theme: 'system' });
  });
});
