module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        '@typescript-eslint/indent': ['error', 4, { SwitchCase: 1, flatTernaryExpressions: true }],
        'linebreak-style': ['error', 'unix'],
        'max-len': ['error', 80, 4],
        'no-unused-vars': ['error', {
            args: 'none',
            varsIgnorePattern: '_',
        }],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
    },
};
