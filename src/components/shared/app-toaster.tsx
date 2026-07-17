'use client';

import { useTheme } from 'next-themes';
import type { CSSProperties } from 'react';
import { Toaster } from 'sonner';

const toasterStyle: CSSProperties & Record<'--width', string> = {
  '--width': 'min(240px, calc(100vw - 2rem))',
};

const AppToaster = () => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'light' || resolvedTheme === 'dark' ? resolvedTheme : 'system';

  return (
    <Toaster
      duration={3000}
      position='top-center'
      richColors
      style={toasterStyle}
      theme={theme}
      toastOptions={{
        classNames: {
          toast: '!min-h-0 !px-3 !py-2',
          icon: '!size-4',
          content: '!gap-2',
          title: '!text-sm',
        },
      }}
    />
  );
};

export default AppToaster;
