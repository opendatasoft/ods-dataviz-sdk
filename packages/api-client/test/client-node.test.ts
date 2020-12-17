/**
 * @jest-environment node
 */
import { describe, expect, it } from '@jest/globals';
import { ApiClient } from '../src';

describe('Api client in Node environment', () => {
    it('should warn when fetch is missing', () => {
        expect(() => {
            new ApiClient();
        }).toThrowError('fetch');
    });

    it('should warn when domain is missing', () => {
        expect(() => {
            new ApiClient({
                fetch: (() => {}) as any,
            });
        }).toThrowError('domain');
    });
});
