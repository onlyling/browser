module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'prettier/@typescript-eslint'],
  env: {
    node: true,
    browser: true,
    commonjs: true,
    amd: true,
  },
  rules: {
    // disable the rule for all files
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'no-useless-escape': 0,
  },
};
