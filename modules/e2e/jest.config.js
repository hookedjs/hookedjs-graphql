module.exports = {
	preset: 'jest-puppeteer',
	globals: {
		URL: 'http://localhost:3000',
	},
	// roots: ['../../../e2e'],
	testMatch: ['**/*.test.ts'],
	transform: {
		'\\.ts$': 'react-scripts/config/jest/babelTransform',
	},
	verbose: true,
	setupFilesAfterEnv: ['./setup.ts'],
	maxConcurrency: 1,
};
