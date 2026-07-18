import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

import { langStore } from '@/store/use-lang-store';

import HeaderDesktop from '../../layout/header/header-desktop';
import HeaderMobile from '../../layout/header/header-mobile';
import ResumeCopyButton from '../resume-copy-button';

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

jest.mock('@/components/shared/language-toggle', () => {
  function LanguageToggleMock() {
    return <button>언어 전환</button>;
  }

  return LanguageToggleMock;
});
jest.mock('@/components/shared/theme-dropdown-button', () => {
  function ThemeDropdownButtonMock() {
    return <button>테마 전환</button>;
  }

  return ThemeDropdownButtonMock;
});
jest.mock('../../layout/header/logo-title', () => {
  function LogoTitleMock() {
    return <div>로고</div>;
  }

  return LogoTitleMock;
});
jest.mock('../../layout/header/nav-item', () => {
  function NavItemMock() {
    return <li>메뉴</li>;
  }

  return NavItemMock;
});
jest.mock('sonner', () => ({
  toast: {
    custom: jest.fn(),
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe('ResumeCopyButton 컴포넌트', () => {
  beforeEach(() => {
    langStore.setState({ lang: 'ko' });
    jest.clearAllMocks();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: jest.fn() },
    });
  });

  afterEach(() => {
    jest.useRealTimers();

    if (originalClipboard) {
      Object.defineProperty(navigator, 'clipboard', originalClipboard);
      return;
    }

    Reflect.deleteProperty(navigator, 'clipboard');
  });

  it('요약본을 선택하면 성공 커스텀 토스트를 호출하고 기본 버튼을 유지한다', async () => {
    const user = userEvent.setup();
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator.clipboard, { writeText });

    render(<ResumeCopyButton />);
    expect(screen.getByRole('button', { name: '이력서 복사' })).toHaveClass('cursor-pointer');

    await user.click(screen.getByRole('button', { name: '이력서 복사' }));

    expect(screen.getByRole('menuitem', { name: '요약본 복사' })).toHaveClass('cursor-pointer');
    expect(screen.getByRole('menuitem', { name: '상세본 복사' })).toHaveClass('cursor-pointer');

    await user.click(screen.getByRole('menuitem', { name: '요약본 복사' }));

    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('# 장명주'));
    expect(toast.custom).toHaveBeenCalledTimes(1);
    expect(toast.custom).toHaveBeenCalledWith(expect.any(Function), {
      style: {
        left: '50%',
        width: 'fit-content',
        maxWidth: 'calc(100vw - 2rem)',
        transform: 'var(--y) translateX(-50%)',
      },
    });
    expect(toast.success).not.toHaveBeenCalled();
    const renderToast = jest.mocked(toast.custom).mock.calls[0][0];
    render(renderToast('success-toast'));
    expect(screen.getByTestId('resume-copy-toast-success')).toBeInTheDocument();
    expect(screen.getByText('이력서 요약본을 복사했어요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '이력서 복사' })).toBeInTheDocument();
  });

  it('상세본을 선택하면 성공 커스텀 토스트를 호출하고 기본 버튼을 유지한다', async () => {
    const user = userEvent.setup();
    Object.assign(navigator.clipboard, {
      writeText: jest.fn().mockResolvedValue(undefined),
    });

    render(<ResumeCopyButton />);
    await user.click(screen.getByRole('button', { name: '이력서 복사' }));
    await user.click(screen.getByRole('menuitem', { name: '상세본 복사' }));

    expect(toast.custom).toHaveBeenCalledTimes(1);
    expect(toast.success).not.toHaveBeenCalled();
    const renderToast = jest.mocked(toast.custom).mock.calls[0][0];
    render(renderToast('success-toast'));
    expect(screen.getByTestId('resume-copy-toast-success')).toBeInTheDocument();
    expect(screen.getByText('이력서 상세본을 복사했어요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '이력서 복사' })).toBeInTheDocument();
  });

  it('클립보드 복사 실패 시 오류 커스텀 토스트를 호출하고 기본 버튼 상태를 유지한다', async () => {
    const user = userEvent.setup();
    Object.assign(navigator.clipboard, {
      writeText: jest.fn().mockRejectedValue(new Error('denied')),
    });

    render(<ResumeCopyButton />);
    await user.click(screen.getByRole('button', { name: '이력서 복사' }));
    await user.click(screen.getByRole('menuitem', { name: '상세본 복사' }));

    expect(toast.custom).toHaveBeenCalledTimes(1);
    expect(toast.error).not.toHaveBeenCalled();
    const renderToast = jest.mocked(toast.custom).mock.calls[0][0];
    render(renderToast('error-toast'));
    expect(screen.getByTestId('resume-copy-toast-error')).toBeInTheDocument();
    expect(screen.getByText('복사하지 못했어요. 다시 시도해 주세요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '이력서 복사' })).toBeInTheDocument();
  });

  it('데스크톱 헤더에 이력서 다운로드 버튼을 렌더링한다', () => {
    render(<HeaderDesktop />);

    expect(screen.getByRole('button', { name: '이력서 PDF 다운로드' })).toBeInTheDocument();
  });

  it('모바일 메뉴에 이력서 다운로드 버튼을 렌더링한다', async () => {
    const user = userEvent.setup();
    render(<HeaderMobile />);

    await user.click(screen.getByRole('button', { name: 'Toggle menu' }));

    expect(screen.getByRole('button', { name: '이력서 PDF 다운로드' })).toBeInTheDocument();
  });
});
