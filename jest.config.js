/* eslint-disable prettier/prettier */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/cypress/',
    '<rootDir>/tests/e2e'
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js'
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/styles/__mocks__/style.ts',
    '^@pages/(.*)$': '<rootDir>/pages/$1',
    '^@components/(.*)$': '<rootDir>/components/$1'
  },
  collectCoverage: true,
  coverageDirectory: 'coverage/jest'
};
