import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps, PropsWithChildren } from 'react';
import { toast } from 'sonner';

import CareerDetail from '@/app/career/[slug]/_components/career-detail';

import CareerLinkCopyButton from '../career-link-copy-button';

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
let mockLanguage = 'ko';

jest.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'dark' }),
}));
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill: _fill, priority: _priority, ...props }: ComponentProps<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt} />
  ),
}));
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }: PropsWithChildren<ComponentProps<'a'>>) => (
    <a {...props}>{children}</a>
  ),
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: mockLanguage },
    t: (key: string) => {
      if (key === 'resume-copy-failure') {
        return '복사하지 못했어요. 다시 시도해 주세요';
      }

      if (key === 'detail.viewed') return 'Viewed';
      if (key === 'detail.viewedStatus') return '읽음 상태';

      return key;
    },
  }),
}));
jest.mock('@/components/shared/fade-in-up', () => ({
  __esModule: true,
  default: ({ children }: PropsWithChildren) => <>{children}</>,
}));
jest.mock('@/app/career/[slug]/_components/company-overview', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('sonner', () => ({
  toast: {
    custom: jest.fn(),
  },
}));

describe('CareerLinkCopyButton 컴포넌트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLanguage = 'ko';
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: jest.fn() },
    });
  });

  afterEach(() => {
    if (originalClipboard) {
      Object.defineProperty(navigator, 'clipboard', originalClipboard);
      return;
    }

    Reflect.deleteProperty(navigator, 'clipboard');
  });

  it('회사 링크를 복사하고 접근 가능한 이름과 성공 토스트를 제공한다', async () => {
    const user = userEvent.setup();
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator.clipboard, { writeText });

    render(
      <CareerLinkCopyButton
        slug='cdri'
        label='회사 링크 복사'
        successMessage='회사 페이지 링크를 복사했어요'
      />
    );

    await user.click(screen.getByRole('button', { name: '회사 링크 복사' }));

    expect(writeText).toHaveBeenCalledWith('https://www.myungjoo.dev/career/cdri');
    expect(toast.custom).toHaveBeenCalledTimes(1);
    expect(toast.custom).toHaveBeenCalledWith(expect.any(Function), {
      style: {
        left: '50%',
        width: 'fit-content',
        maxWidth: 'calc(100vw - 2rem)',
        transform: 'var(--y) translateX(-50%)',
      },
    });
  });

  it('케이스 스터디 링크에 프로젝트 해시를 붙인다', async () => {
    const user = userEvent.setup();
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator.clipboard, { writeText });

    render(
      <CareerLinkCopyButton
        slug='cdri'
        projectId={2}
        label='케이스 스터디 링크 복사'
        successMessage='케이스 스터디 링크를 복사했어요'
      />
    );

    await user.click(screen.getByRole('button', { name: '케이스 스터디 링크 복사' }));

    expect(writeText).toHaveBeenCalledWith('https://www.myungjoo.dev/career/cdri#project-2');
  });

  it('클립보드 복사에 실패하면 기존 실패 문구로 오류 토스트를 표시한다', async () => {
    const user = userEvent.setup();
    Object.assign(navigator.clipboard, {
      writeText: jest.fn().mockRejectedValue(new Error('denied')),
    });

    render(
      <CareerLinkCopyButton
        slug='cdri'
        label='회사 링크 복사'
        successMessage='회사 페이지 링크를 복사했어요'
      />
    );

    await user.click(screen.getByRole('button', { name: '회사 링크 복사' }));

    expect(toast.custom).toHaveBeenCalledTimes(1);
    const renderToast = jest.mocked(toast.custom).mock.calls[0][0];
    render(renderToast('error-toast'));
    expect(screen.getByTestId('resume-copy-toast-error')).toBeInTheDocument();
    expect(screen.getByText('복사하지 못했어요. 다시 시도해 주세요')).toBeInTheDocument();
  });

  it('회사와 6개 케이스 스터디 헤더에서 실제 앵커 URL을 복사한다', async () => {
    const user = userEvent.setup();
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator.clipboard, { writeText });

    render(<CareerDetail slug='cdri' />);

    await user.click(screen.getByRole('button', { name: '회사 링크 복사' }));
    for (const button of screen.getAllByRole('button', { name: '케이스 스터디 링크 복사' })) {
      await user.click(button);
    }

    expect(writeText.mock.calls.map(([url]) => url)).toEqual([
      'https://www.myungjoo.dev/career/cdri',
      'https://www.myungjoo.dev/career/cdri#project-1',
      'https://www.myungjoo.dev/career/cdri#project-2',
      'https://www.myungjoo.dev/career/cdri#project-3',
      'https://www.myungjoo.dev/career/cdri#project-4',
      'https://www.myungjoo.dev/career/cdri#project-5',
      'https://www.myungjoo.dev/career/cdri#project-6',
    ]);
  });

  it('영문 헤더는 영문 접근 가능한 이름과 성공 메시지를 전달한다', async () => {
    const user = userEvent.setup();
    mockLanguage = 'en';
    Object.assign(navigator.clipboard, { writeText: jest.fn().mockResolvedValue(undefined) });

    render(<CareerDetail slug='cdri' />);

    await user.click(screen.getByRole('button', { name: 'Copy company link' }));
    expect(screen.getAllByRole('button', { name: 'Copy case study link' })).toHaveLength(6);

    const renderToast = jest.mocked(toast.custom).mock.calls[0][0];
    render(renderToast('success-toast'));
    expect(screen.getByText('Company page link copied')).toBeInTheDocument();
  });

  it('회사 페이지가 바뀌면 Viewed 상태를 초기화한다', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<CareerDetail slug='cdri' />);

    await user.click(screen.getAllByRole('checkbox', { name: /읽음 상태/ })[0]);
    expect(screen.queryByText(/매주 접수되는 사전과제/)).not.toBeInTheDocument();

    rerender(<CareerDetail slug='supertree' />);
    expect(screen.getAllByRole('checkbox', { name: /읽음 상태/ })[0]).not.toBeChecked();
  });
});
