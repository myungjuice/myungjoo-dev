'use client';

import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';

const AppToaster = () => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'light' || resolvedTheme === 'dark' ? resolvedTheme : 'system';

  return (
    <Toaster
      duration={3000}
      position='top-center'
      richColors
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
