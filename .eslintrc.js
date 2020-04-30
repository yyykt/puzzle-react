module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    // 'plugin:react/recommended',
    'react-app',
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src'],
      }
    }
  },
  rules: {
    'react/jsx-filename-extension': [1, { 'extensions': ['.jsx', '.tsx'] }],
    'prettier/prettier': 'error',
    'import/extensions': ['error', 'ignorePackages', {
      'js': 'never',
      'mjs': 'never',
      'ts': 'never',
      'jsx': 'never',
      'tsx': 'never',
    }],
    'react/prop-types': 'off',
  },
};