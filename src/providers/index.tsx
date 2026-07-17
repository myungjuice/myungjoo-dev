import { type PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

import I18nProvider from './i18n-provider';
import ThemeProvider from './theme-provider';

const Providers = ({ children }: PropsWithChildren) => (
  <I18nProvider>
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      {children}
      <Toaster duration={3000} position='top-center' richColors />
    </ThemeProvider>
  </I18nProvider>
);

export default Providers;
