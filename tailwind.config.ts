import type { Config } from 'tailwindcss';

import colors from './src/styles/theme/colors';
import typography from './src/styles/theme/typography';

const config: Config = {
  darkMode: 'class',
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors,
      fontSize: typography,
      fontFamily: {
        fira: ['var(--font-fira)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
