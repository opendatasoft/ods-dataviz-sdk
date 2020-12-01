/**
 * @jest-environment jsdom
 */

import { enableFetchMocks } from 'jest-fetch-mock';
import { ApiClient, field, fromCatalog } from '../src';
import { expect, it, beforeEach, describe } from '@jest/globals';
enableFetchMocks();

describe('Api client', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should create a client without error', () => {
        const client = new ApiClient();
        expect(client.defaultConfig.baseUrl).toEqual('http://localhost/api/v2/');
    });

    it('should use the global fetch', () => {
        const client = new ApiClient();
        const globalFetch = global.fetch;
        expect(client.defaultConfig.fetch).toEqual(globalFetch);
    });

    it('should call fetch with the right url', async () => {
        const apiResponse = { any: 'any' };
        fetchMock.once(async req => {
            expect(req.url).toEqual('https://public.opendatasoft.com/api/v2/catalog/');
            return JSON.stringify(apiResponse);
        });
        const client = new ApiClient({ domain: 'public' });
        const response = await client.get('catalog/');
        expect(response).toEqual(apiResponse);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('works with the query builder', async () => {
        const apiResponse = { any: 'any' };
        fetchMock.once(async req => {
            expect(req.url).toEqual(
                'https://public.opendatasoft.com/api/v2/catalog/facets/?facet=facet1&facet=facet2&refine=%60facet1%60%3Avalue'
            );
            return JSON.stringify(apiResponse);
        });
        const client = new ApiClient({ domain: 'public' });
        const response = await client.get(
            fromCatalog()
                .facets()
                .refine(`${field('facet1')}:value`)
                .facet('facet2')
                .facet('facet1')
        );
        expect(response).toEqual(apiResponse);
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});
