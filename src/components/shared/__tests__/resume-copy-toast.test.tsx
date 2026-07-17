import { render, screen } from '@testing-library/react';

import ResumeCopyToast from '../resume-copy-toast';

jest.mock('react-icons/fi', () => ({
  FiAlertCircle: () => <svg data-testid='alert-circle-icon' />,
  FiCheckCircle: () => <svg data-testid='check-circle-icon' />,
}));

describe('ResumeCopyToast 컴포넌트', () => {
  it('다크 테마 성공 토스트에 내용 폭, 성공 색상, 부모 mounted/removed 전환을 적용한다', () => {
    render(<ResumeCopyToast message='이력서를 복사했어요' theme='dark' type='success' />);

    const toast = screen.getByText('이력서를 복사했어요').parentElement;

    expect(toast).not.toBeNull();
    expect(toast).toHaveClass(
      'inline-flex',
      'w-max',
      'max-w-[calc(100vw-2rem)]',
      'border-emerald-900',
      'bg-emerald-950',
      'text-emerald-200',
      '[[data-sonner-toast][data-mounted=true]_&]:scale-100',
      '[[data-sonner-toast][data-mounted=true]_&]:opacity-100',
      '[[data-sonner-toast][data-removed=true]_&]:scale-95',
      '[[data-sonner-toast][data-removed=true]_&]:opacity-0'
    );
    expect(toast).not.toHaveAttribute('aria-live');
    expect(screen.getByTestId('check-circle-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('alert-circle-icon')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('라이트 테마 오류 토스트에 오류 색상과 AlertCircle 아이콘을 적용한다', () => {
    render(<ResumeCopyToast message='복사하지 못했어요' theme='light' type='error' />);

    expect(screen.getByText('복사하지 못했어요').parentElement).toHaveClass(
      'border-red-200',
      'bg-red-50',
      'text-red-800'
    );
    expect(screen.getByTestId('alert-circle-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('check-circle-icon')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
