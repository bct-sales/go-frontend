import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
  { ignores: ['dist', 'build', 'node_modules'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic,
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
      ...reactHooks.configs.recommended.rules,

      // React / TS adjustments
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

      // ==========================================
      // YOUR CUSTOM FORMATTING RULES (ESLint-only)
      // ==========================================
      '@stylistic/indent': ['error', 4],                     // Indent size (or 'tab')
      '@stylistic/quotes': ['error', 'single'],               // Single vs double quotes
      '@stylistic/semi': ['error', 'always'],                 // Require or forbid semicolons ('always' | 'never')
      '@stylistic/comma-dangle': ['error', 'always-multiline'], // Trailing commas
      '@stylistic/max-len': ['error', { code: 160 }],         // Max line length

      // JSX / React Formatting Rules
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],   // JSX attribute quotes
      '@stylistic/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
      '@stylistic/jsx-indent-props': ['error', 4],
      '@stylistic/jsx-self-closing-comp': 'error',
    },
  }
);