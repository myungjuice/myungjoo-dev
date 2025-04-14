import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './input';

describe('Input 컴포넌트', () => {
  it('기본 렌더링이 정상적으로 동작한다', () => {
    render(<Input placeholder='이메일 입력' />);
    const input = screen.getByPlaceholderText('이메일 입력');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('type, value, disabled 등의 속성이 적용된다', () => {
    render(<Input type='email' value='test@example.com' disabled />);
    const input = screen.getByDisplayValue('test@example.com');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toBeDisabled();
  });

  it('onChange 이벤트가 호출된다', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'hello');

    expect(handleChange).toHaveBeenCalledTimes(5);
  });
});
