/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-airbnb-with-typescript',
    'plugin:prettier/recommended', // Add prettier/recommended last
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-restricted-syntax': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vue/multi-word-component-names': 'off',
    'import/prefer-default-export': 'off',
  },
};
