module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['react', 'prettier'],
  extends: ['plugin:react/recommended', 'standard-with-typescript', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
  },
  rules: {
    'prettier/prettier': 'error',
  },
};
