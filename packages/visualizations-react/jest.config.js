module.exports = {
    setupFiles: ['jest-canvas-mock'],
    transform: {
        '.(ts|tsx)$': require.resolve('ts-jest/dist'),
        '.(js|jsx)$': require.resolve('babel-jest'),
        '.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/jestFileTransformer.js',
    },
};
