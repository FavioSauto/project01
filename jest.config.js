// const nextJest = require('next/jest');

// const createJestConfig = nextJest({
//   dir: './',
// });

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/lib/jest-setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/e2e/',
  ],
  testMatch: [
    '<rootDir>/features/**/tests/**/*.test.{ts,tsx}',
    '<rootDir>/lib/**/*.test.{ts,tsx}',
    '<rootDir>/lib/**/*.test.ts',
  ],
  collectCoverageFrom: [
    'features/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    'lib/**/*.ts',
    '!features/**/tests/**',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

module.exports = customJestConfig;

