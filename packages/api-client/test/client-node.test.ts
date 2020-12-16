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
});
