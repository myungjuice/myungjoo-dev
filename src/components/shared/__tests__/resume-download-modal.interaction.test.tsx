import { render, screen, fireEvent } from '@testing-library/react';

import ResumeDownloadModal from '../resume-download-modal';

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
jest.mock('@/lib/resume-pdf/ResumePdfDocument', () => ({ ResumePdfDocument: () => <div /> }));

describe('ResumeDownloadModal interactions', () => {
  it('defaults to A and resets selection when reopened', () => {
    const { rerender } = render(<ResumeDownloadModal open onClose={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'resume-download-template A' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    fireEvent.click(screen.getByRole('button', { name: 'resume-download-template B' }));
    rerender(<ResumeDownloadModal open={false} onClose={jest.fn()} />);
    rerender(<ResumeDownloadModal open onClose={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'resume-download-template A' })).toHaveAttribute(
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
