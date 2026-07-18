import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';

import ResumeDownloadModal from '../resume-download-modal';

let mockLanguage = 'ko';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      get language() {
        return mockLanguage;
      },
    },
  }),
}));
jest.mock('@/lib/resume-pdf/ResumePdfDocument', () => ({ ResumePdfDocument: () => <div /> }));

describe('ResumeDownloadModal interactions', () => {
  beforeEach(() => {
    mockLanguage = 'ko';
  });

  it('defaults to 요약 분량과 계층형 PDF로 열리고 다시 열 때 초기화된다', () => {
    const { rerender } = render(<ResumeDownloadModal open onClose={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'resume-download-summary' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.queryByText('resume-download-template')).not.toBeInTheDocument();
    rerender(<ResumeDownloadModal open={false} onClose={jest.fn()} />);
    rerender(<ResumeDownloadModal open onClose={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'resume-download-summary' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('closes and exposes a PDF download action', () => {
    const onClose = jest.fn();
    render(<ResumeDownloadModal open onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'resume-download-close' }));
    expect(onClose).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'resume-download-pdf' })).toBeInTheDocument();
  });

  it('Escape로 닫고 트리거 버튼에 포커스를 돌려준다', async () => {
    const onClose = jest.fn();
    const triggerRef = createRef<HTMLButtonElement>();
    const { rerender } = render(
      <>
        <button ref={triggerRef}>이력서 열기</button>
        <ResumeDownloadModal open onClose={onClose} triggerRef={triggerRef} />
      </>
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalled();
    rerender(
      <>
        <button ref={triggerRef}>이력서 열기</button>
        <ResumeDownloadModal open={false} onClose={onClose} triggerRef={triggerRef} />
      </>
    );
    await waitFor(() => expect(triggerRef.current).toHaveFocus());
  });

  it('영어 환경에서는 English를 기본 선택하고 재오픈 시 현재 언어를 반영한다', () => {
    mockLanguage = 'en';
    const { rerender } = render(<ResumeDownloadModal open onClose={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'resume-download-english' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'resume-download-korean' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );

    mockLanguage = 'ko';
    rerender(<ResumeDownloadModal open={false} onClose={jest.fn()} />);
    rerender(<ResumeDownloadModal open onClose={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'resume-download-korean' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });
});
