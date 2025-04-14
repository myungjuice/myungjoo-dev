import React from 'react';

import I18nProvider from './i18nProvider';
import ThemeProvider from './themeProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => (
  <I18nProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </I18nProvider>
);

export default Providers;
