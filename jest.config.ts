/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  clearMocks: true,
  coverageProvider: 'v8',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  roots: ['<rootDir>/src'],

  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}
