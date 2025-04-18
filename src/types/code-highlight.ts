export type ShikiDarkTheme =
  | 'dark-plus'
  | 'dracula'
  | 'dracula-soft'
  | 'github-dark'
  | 'github-dark-default'
  | 'github-dark-dimmed'
  | 'github-dark-high-contrast'
  | 'material-theme-darker'
  | 'min-dark'
  | 'monokai'
  | 'monokai-pro'
  | 'night-owl'
  | 'nord'
  | 'one-dark-pro'
  | 'poimandres'
  | 'rose-pine-moon'
  | 'rose-pine'
  | 'slack-dark'
  | 'slack-ochin'
  | 'solarized-dark'
  | 'tokyo-night'
  | 'vitesse-black'
  | 'vitesse-dark'
  | 'z-touch';

export type ShikiLightTheme =
  | 'css-variables'
  | 'github-light'
  | 'github-light-default'
  | 'github-light-high-contrast'
  | 'light-plus'
  | 'material-theme-lighter'
  | 'material-theme-ocean'
  | 'material-theme-palenight'
  | 'min-light'
  | 'quietlight'
  | 'rose-pine-dawn'
  | 'solarized-light'
  | 'tokyo-night-day'
  | 'tokyo-night-light'
  | 'vitesse-light';

export type Theme = 'dark' | 'light';

export type Themes = {
  dark: ShikiDarkTheme;
  light: ShikiLightTheme;
};

export type CodeHighlightProps = {
  rawCode: string;
  className?: string;
  themes?: Themes;
};
