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
      keyframes: {
        'octocat-wave': {
          '0%, 100%': { transform: 'rotate(0)' },
          '20%, 60%': { transform: 'rotate(-25deg)' },
          '40%, 80%': { transform: 'rotate(10deg)' },
        },
      },
      animation: {
        'octocat-wave': 'octocat-wave 560ms ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
