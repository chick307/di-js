module.exports = {
    compact: true,
    env: {
        production: {
            auxiliaryCommentBefore:
                '(C) 2015 chick307 <chick307@gmail.com>\n' +
                'Licensed under the MIT License. http://chick307.mit-license.org/',
        },
        test: {
            sourceMaps: 'inline',
        },
    },
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: '12',
            },
        }],
    ],
    sourceRoot: '.',
}
