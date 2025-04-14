import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './dropdown-menu';

describe('DropdownMenu 컴포넌트', () => {
  it('트리거 버튼 클릭 시 메뉴가 열린다', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>열기</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>메뉴1</DropdownMenuItem>
          <DropdownMenuItem>메뉴2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.queryByText('메뉴1')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '열기' }));

    expect(screen.getByText('메뉴1')).toBeInTheDocument();
    expect(screen.getByText('메뉴2')).toBeInTheDocument();
  });

  it('아이템 클릭 시 onSelect 콜백이 실행된다', async () => {
    const user = userEvent.setup();
    const handleSelect = jest.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>열기</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleSelect}>선택</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByRole('button', { name: '열기' }));
    await user.click(screen.getByText('선택'));

    expect(handleSelect).toHaveBeenCalled();
  });
});
