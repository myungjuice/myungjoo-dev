import type { Config } from 'tailwindcss';

import { colors, fontSize } from './src/styles/theme';

const config: Config = {
  darkMode: 'class',
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors,
      fontSize,
    },
  },
  plugins: [],
};
export default config;
