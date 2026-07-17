'use client';

import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';

const AppToaster = () => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'light' || resolvedTheme === 'dark' ? resolvedTheme : 'system';

  return <Toaster duration={3000} position='top-center' theme={theme} />;
};

export default AppToaster;
