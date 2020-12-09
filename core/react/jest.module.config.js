module.exports = {
	// roots: ['../../../react/e2e'],
	testMatch: ['**/*.test.tsx'],
	transform: {
		'\\.tsx$': 'react-scripts/config/jest/babelTransform',
	},
	// verbose: true,
	// setupFilesAfterEnv: ['./setup.ts'],
	maxConcurrency: 1,
};
