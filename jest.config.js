module.exports = {
    testMatch: ['<rootDir>/test/**/*.[jt]s'],
    transform: {
        '\\.[jt]s$': 'babel-jest',
    },
};
