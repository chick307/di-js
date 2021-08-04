module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
        node: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        sourceType: 'module',
    },
    rules: {
        'indent': ['error', 4],
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
