module.exports = {
    setupFiles: [
        'jest-canvas-mock',
    ],
    setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
    testEnvironment: 'jsdom',
};  
