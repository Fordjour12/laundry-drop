import type { Config } from 'jest'

const config: Config = {
	verbose: true,
	rootDir: './src/test/',
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	testEnvironment: 'node',
	testRegex: './src/.*\\.(test|spec)?\\.(js|ts)$',
	moduleFileExtensions: ['ts', 'js', 'json'],
}

export default config
