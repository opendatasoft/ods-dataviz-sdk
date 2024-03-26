module.exports = {
    setupFiles: ['jest-canvas-mock'],
    setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        src: '<rootDir>/src',
        reactify: '<rootDir>/src/reactify',
        // https://jestjs.io/docs/webpack#handling-static-assets
        '\\.css$': '<rootDir>/test/__mocks__/styleMock.js',
    },
};  
