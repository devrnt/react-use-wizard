module.exports = {
  // https://github.com/testing-library/jest-native/issues/46#issuecomment-748674706
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  globals: {
    __DEV__: 'development',
  },
};
