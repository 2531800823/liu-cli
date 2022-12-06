module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  parserOptions: {
    project: './tsconfig.json',
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    createDefaultProgram: true,
  },

  rules: {
    indent: 'off',
    'no-return-assign': 0,
    semi: ['error', 'always'],
    // 会误伤@
    'import/no-unresolved': 'off',
    'no-confusing-arrow': 0,
    'no-console': 0,
    'max-len': ['error', { code: 120, ignoreComments: true, ignoreStrings: true }],
    'space-before-function-paren': [
      'error',
      { anonymous: 'never', named: 'never', asyncArrow: 'always' },
    ],
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'no-nested-ternary': 'off',
    'default-case': 'off',
    'no-case-declarations': 'off',
    'no-param-reassign': 'off',
    'no-useless-escape': 'off',
    'no-lonely-if': 'off',
    'no-undef': 'off',
  },
};
