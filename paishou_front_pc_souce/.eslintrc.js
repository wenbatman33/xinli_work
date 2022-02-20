module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-tabs': 'off',
		'max-len': 0,
		'no-console': 0,
		'quote-props': 0,
		'no-unused-vars': 0,
		'no-trailing-spaces': 0,
		'no-multi-assign': 0,
		'import/no-extraneous-dependencies': 0,
		'no-useless-escape': 0,
		'no-underscore-dangle': 0,
		'prefer-destructuring': 0,
		'no-irregular-whitespace': 0,
		'no-restricted-syntax': 0,
		'guard-for-in': 0,
		semi: 0,
	},
};
