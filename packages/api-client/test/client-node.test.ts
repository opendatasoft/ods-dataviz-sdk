/**
 * @jest-environment node
 */

/* eslint-disable no-new */
import { describe, expect, it } from '@jest/globals';
import { ApiClient } from '../src';

describe('Api client in Node environment', () => {
    it('should warn when domain is missing', () => {
        expect(() => {
            new ApiClient({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                fetch: (() => {}) as any,
            });
        }).toThrowError('domain');
    });
});
