import React from 'react';

import I18nProvider from './i18n-provider';
import ThemeProvider from './theme-provider';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => (
  <I18nProvider>
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  </I18nProvider>
);

export default Providers;
