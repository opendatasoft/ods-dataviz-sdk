import '@testing-library/jest-dom';
// Used by MapLibre GL JS
global.URL.createObjectURL = jest.fn()
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))