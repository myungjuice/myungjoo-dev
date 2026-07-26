import nextConfig from 'eslint-config-next';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import importXPlugin from 'eslint-plugin-import-x';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      'eslint.config.mjs',
      'postcss.config.mjs',
      'next.config.ts',
      'tailwind.config.ts',
      // This Node/tsx verification utility imports TS/TSX modules at runtime;
      // it is covered by `pnpm verify:resume-pdf`, not the app's type-aware lint.
      'scripts/verify-resume-pdf.mjs',
      // 이 Node 검증 스크립트는 tsconfig project 범위 밖이므로 type-aware lint에서 제외한다.
      // 실제 품질 게이트는 `pnpm verify:harness`의 self-test와 Prettier다.
      'scripts/verify-agent-harness.mjs',
    ],
  },
  ...nextConfig,
  prettierRecommended,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'import-x': importXPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.ts', '.jsx', '.js'] }],
      'react/self-closing-comp': 'warn',
      'react/jsx-boolean-value': ['warn', 'never'],
      'react/prop-types': 'off',
      'react/no-unknown-property': 'error',
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      'react/jsx-no-comment-textnodes': 'off',
      'react-hooks/set-state-in-effect': 'off',

      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import-x/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import-x/newline-after-import': 'warn',

      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      'no-unused-vars': 'off',
      'no-undef': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-alert': 'warn',
      'no-var': 'error',
      'prefer-const': 'warn',
      'prefer-template': 'warn',
      'arrow-body-style': ['warn', 'as-needed'],
      'no-multi-spaces': 'warn',
      'no-useless-return': 'warn',
      'no-empty-function': ['warn', { allow: ['arrowFunctions'] }],
      'no-duplicate-imports': 'error',
      'no-else-return': 'warn',
      'object-shorthand': ['warn', 'always'],
      'no-useless-concat': 'warn',

      yoda: ['error', 'never'],
      eqeqeq: ['error', 'always'],

      'jsx-a11y/anchor-is-valid': 'warn',

      'prettier/prettier': 'warn',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  }
);
