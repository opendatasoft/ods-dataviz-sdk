module.exports = {
    setupFiles: ['jest-canvas-mock'],
    transform: {
        '^.+\\.svg$': '<rootDir>/test/identity-transform.js'
    },
};
