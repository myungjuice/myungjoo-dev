import { render, screen } from '@testing-library/react';

import { Label } from '../label';

describe('Label 컴포넌트', () => {
  it('children을 포함해 렌더링된다', () => {
    render(<Label htmlFor='email'>이메일</Label>);
    expect(screen.getByText('이메일')).toBeInTheDocument();
  });

  it('htmlFor 속성이 제대로 반영된다', () => {
    render(<Label htmlFor='username'>이름</Label>);
    const label = screen.getByText('이름');
    expect(label).toHaveAttribute('for', 'username');
  });

  it('className이 병합되어 적용된다', () => {
    render(<Label className='text-red-500'>라벨</Label>);
    const label = screen.getByText('라벨');
    expect(label).toHaveClass('text-red-500');
  });
});
