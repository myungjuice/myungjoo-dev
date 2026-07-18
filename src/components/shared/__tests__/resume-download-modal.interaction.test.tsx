import { render, screen, fireEvent } from '@testing-library/react';

import ResumeDownloadModal from '../resume-download-modal';

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
jest.mock('@/lib/resume-pdf/ResumePdfDocument', () => ({ ResumePdfDocument: () => <div /> }));

describe('ResumeDownloadModal interactions', () => {
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
});
