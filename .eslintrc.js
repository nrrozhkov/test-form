module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:@conarti/feature-sliced/recommended',
		'@feature-sliced',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'react'],
	rules: {
		'react/display-name': 'off',
		indent: ['off'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single', { "avoidEscape": true }],
		semi: ['error', 'always'],
		'@typescript-eslint/no-explicit-any': 0,

	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
