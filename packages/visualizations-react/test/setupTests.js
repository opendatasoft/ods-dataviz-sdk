import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
// Used by MapLibre GL JS
global.URL.createObjectURL = jest.fn();
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));
