import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import useMounted from '../use-mounted';

const TestComponent = () => {
  const mounted = useMounted();
  return <div>{mounted && <span data-testid='mounted'>Mounted</span>}</div>;
};

describe('useMounted', () => {
  it('마운트된 이후 mounted가 true가 된다', async () => {
    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('mounted')).toBeInTheDocument();
    });
  });
});
