import { type PropsWithChildren } from 'react';

import I18nProvider from './i18n-provider';
import ThemeProvider from './theme-provider';

const Providers = ({ children }: PropsWithChildren) => (
  <I18nProvider>
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  </I18nProvider>
);

export default Providers;
