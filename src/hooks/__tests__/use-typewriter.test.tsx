import { render, screen, act, waitFor } from '@testing-library/react';
import React from 'react';

import { useTypewriter } from '../use-typewriter';

jest.useFakeTimers();

const TestComponent = ({
  lines,
  speed = 100,
  isLoop = false,
  onComplete,
}: {
  lines: string[];
  speed?: number;
  isLoop?: boolean;
  onComplete?: () => void;
}) => {
  const { typedTexts } = useTypewriter({
    lines,
    speed,
    isLoop,
    onComplete,
  });

  return (
    <div>
      {typedTexts.map((text, idx) => (
        <p data-testid={`line-${idx}`} key={idx}>
          {text}
        </p>
      ))}
    </div>
  );
};

describe('useTypewriter', () => {
  const lines = ['Hello', 'World'];

  it('타이핑이 순차적으로 진행된다', async () => {
    render(<TestComponent lines={lines} speed={100} />);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => expect(screen.getByTestId('line-0').textContent).toBe('H'));

    act(() => {
      jest.advanceTimersByTime(400);
    });

    await waitFor(() => expect(screen.getByTestId('line-0').textContent).toBe('Hello'));
  });

  it('모든 라인 출력 후 onComplete가 호출된다', async () => {
    const onComplete = jest.fn();
    render(<TestComponent lines={lines} speed={50} onComplete={onComplete} />);

    act(() => {
      jest.advanceTimersByTime(50 * ('Hello'.length + 'World'.length + 1));
    });

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalled();
    });
  });

  it('isLoop가 true일 때 삭제 후 다시 타이핑된다', async () => {
    render(<TestComponent lines={['Hi']} speed={100} isLoop />);

    act(() => {
      jest.advanceTimersByTime(200);
    });

    await waitFor(() => expect(screen.getByTestId('line-0').textContent).toBe('Hi'));

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    await waitFor(() => expect(screen.getByTestId('line-0').textContent).toBe(''));

    act(() => {
      jest.advanceTimersByTime(200);
    });

    await waitFor(() => expect(screen.getByTestId('line-0').textContent).toBe('Hi'));
  });
});
