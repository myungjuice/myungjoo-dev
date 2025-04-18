import { render } from '@testing-library/react';

import Spinner from '@/components/ui/spinner';

describe('Spinner 컴포넌트', () => {
  it('기본 렌더링이 정상적으로 동작한다', () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('animate-spin');
    expect(svg).toHaveClass('w-6');
    expect(svg).toHaveClass('h-6');
  });

  it('size props에 따라 클래스가 올바르게 적용된다', () => {
    const sizes = [
      { size: 'xs', expected: ['w-4', 'h-4'] },
      { size: 'sm', expected: ['w-5', 'h-5'] },
      { size: 'md', expected: ['w-6', 'h-6'] },
      { size: 'lg', expected: ['w-8', 'h-8'] },
      { size: 'xl', expected: ['w-10', 'h-10'] },
    ] as const;

    sizes.forEach(({ size, expected }) => {
      const { container } = render(<Spinner size={size} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass(...expected);
    });
  });

  it('className props로 전달된 클래스가 정상적으로 병합된다', () => {
    const { container } = render(<Spinner className='text-blue-500' />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('text-blue-500');
  });
});
