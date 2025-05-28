import type { Config } from 'jest'

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	roots: ['<rootDir>/src'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	transform: {
		'^.+\\.(ts|tsx)$': 'babel-jest'
	},
	transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)']
}

export default config
