module.exports = {
  extends: [
    'react-app',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:jsdoc/recommended',
  ],
  plugins: ['simple-import-sort', 'jsdoc'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'sort-imports': 'off',
    'import/order': 'off'
  }
};
