module.exports = {
  extends: [
    'react-app',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:jsdoc/recommended',
    'plugin:promise/recommended',
  ],
  plugins: ['simple-import-sort', 'jsdoc', 'promise'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'sort-imports': 'off',
    'import/order': 'off',
    'jsdoc/require-param-type': 'off',
  }
};
