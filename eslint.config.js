import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  // Ignore build and configuration outputs
  { ignores: ['dist', 'build', 'node_modules', '.eslintrc.js'] },

  // Base JS and TypeScript configurations
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // React & React Hooks settings
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // Fast Refresh rule for Vite/modern bundlers
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // React / TS adjustments (React 17+ JSX transform support)
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // Custom TypeScript tweaks
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  }
);

// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'

// export default tseslint.config(
//   { ignores: ['dist'] },
//   {
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//     },
//   },
// )
