import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { langStore } from '@/store/use-lang-store';

import ResumeCopyButton from '../resume-copy-button';

describe('ResumeCopyButton 컴포넌트', () => {
  beforeEach(() => {
    langStore.setState({ lang: 'ko' });
  });

  it('요약본을 선택하면 현재 언어의 요약 텍스트를 복사하고 완료 문구를 표시한다', async () => {
    const user = userEvent.setup();
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator.clipboard, { writeText });

    render(<ResumeCopyButton />);
    await user.click(screen.getByRole('button', { name: '이력서 복사' }));
    await user.click(screen.getByRole('menuitem', { name: '요약본 복사' }));

    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('# 장명주'));
    expect(screen.getByText('요약본을 복사했어요')).toBeInTheDocument();
  });

  it('클립보드 복사 실패 시 실패 문구를 표시한다', async () => {
    const user = userEvent.setup();
    Object.assign(navigator.clipboard, {
      writeText: jest.fn().mockRejectedValue(new Error('denied')),
    });

    render(<ResumeCopyButton />);
    await user.click(screen.getByRole('button', { name: '이력서 복사' }));
    await user.click(screen.getByRole('menuitem', { name: '상세본 복사' }));

    expect(screen.getByText('복사하지 못했어요. 다시 시도해 주세요')).toBeInTheDocument();
  });
});
