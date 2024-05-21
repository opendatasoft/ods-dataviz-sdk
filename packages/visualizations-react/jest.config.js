module.exports = {
    setupFiles: ['jest-canvas-mock'],
    setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        src: '<rootDir>/src',
        'stories/(.*)': '<rootDir>/stories/$1',
        reactify: '<rootDir>/src/reactify',
        // https://jestjs.io/docs/webpack#handling-static-assets
        '\\.css$': '<rootDir>/test/__mocks__/styleMock.js',
    },
};  
