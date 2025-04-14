import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Button } from './button';

describe('Button 컴포넌트', () => {
  it('기본 렌더링이 정상적으로 동작한다', () => {
    render(<Button>클릭</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('클릭');
  });

  it('variant와 size props에 따라 클래스가 적용된다', () => {
    render(
      <Button variant='destructive' size='lg'>
        삭제
      </Button>
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-destructive');
    expect(btn).toHaveClass('h-10');
  });

  it('버튼 클릭 시 이벤트가 호출된다', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>클릭</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('asChild 사용 시 Slot을 통해 컴포넌트를 대체할 수 있다', () => {
    render(
      <Button asChild>
        <a href='/test'>링크</a>
      </Button>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveTextContent('링크');
  });
});
