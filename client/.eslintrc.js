module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-undef': 'off',
    camelcase: 'error',
    'no-var': 'error',
    eqeqeq: 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
}
