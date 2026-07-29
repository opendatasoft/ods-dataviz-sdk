import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
// Used by MapLibre GL JS
// jsdom does not expose TextEncoder/TextDecoder on the global; MapLibre GL JS 5.x
// references them at module load time, so polyfill them from Node's `util`.
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.URL.createObjectURL = jest.fn();
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));
