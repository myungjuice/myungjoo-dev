import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

describe('ResumeCopyButton 컴포넌트', () => {
  beforeEach(() => {
    langStore.setState({ lang: 'ko' });
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

  it('요약본을 선택하면 현재 언어의 요약 텍스트를 복사하고 성공 토스트와 완료 버튼을 표시한다', async () => {
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
    expect(screen.getByRole('status')).toHaveTextContent('요약본을 복사했어요');
    expect(screen.getByRole('status')).toHaveClass('top-4', 'left-1/2', '-translate-x-1/2');
    expect(screen.getByRole('button', { name: '복사 완료' })).toBeInTheDocument();
  });

  it('클립보드 복사 실패 시 오류 토스트만 표시하고 기본 버튼 상태를 유지한다', async () => {
    const user = userEvent.setup();
    Object.assign(navigator.clipboard, {
      writeText: jest.fn().mockRejectedValue(new Error('denied')),
    });

    render(<ResumeCopyButton />);
    await user.click(screen.getByRole('button', { name: '이력서 복사' }));
    await user.click(screen.getByRole('menuitem', { name: '상세본 복사' }));

    expect(screen.getByRole('status')).toHaveTextContent('복사하지 못했어요. 다시 시도해 주세요');
    expect(screen.getByRole('status')).toHaveClass('top-4', 'left-1/2', '-translate-x-1/2');
    expect(screen.getByRole('button', { name: '이력서 복사' })).toBeInTheDocument();
  });

  it('성공 피드백을 3초 후에 초기화한다', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    Object.assign(navigator.clipboard, {
      writeText: jest.fn().mockResolvedValue(undefined),
    });

    render(<ResumeCopyButton />);
    await user.click(screen.getByRole('button', { name: '이력서 복사' }));
    await user.click(screen.getByRole('menuitem', { name: '요약본 복사' }));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '이력서 복사' })).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('데스크톱 헤더에 이력서 복사 버튼을 렌더링한다', () => {
    render(<HeaderDesktop />);

    expect(screen.getByRole('button', { name: '이력서 복사' })).toBeInTheDocument();
  });

  it('모바일 메뉴에 이력서 복사 버튼을 렌더링한다', async () => {
    const user = userEvent.setup();
    render(<HeaderMobile />);

    await user.click(screen.getByRole('button', { name: 'Toggle menu' }));

    expect(screen.getByRole('button', { name: '이력서 복사' })).toBeInTheDocument();
  });
});
