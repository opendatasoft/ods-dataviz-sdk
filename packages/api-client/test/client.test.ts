/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, expect, it } from '@jest/globals';
import { enableFetchMocks } from 'jest-fetch-mock';
import { ApiClient, field, fromCatalog } from '../src';
import { AuthenticationError, NotFoundError, ServerError, UserError } from '../src/client/error';

enableFetchMocks();

describe('Api client', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should create a client without error', () => {
        const client = new ApiClient();
        expect(client.defaultConfig.baseUrl).toEqual('http://localhost/api/explore/v2.1/');
    });

    it('should use the global fetch', () => {
        const client = new ApiClient();
        const globalFetch = global.fetch;
        expect(client.defaultConfig.fetch).toEqual(globalFetch);
    });

    it('should call fetch with the right url', async () => {
        const apiResponse = { any: 'any' };
        fetchMock.once(async (req) => {
            expect(req.url).toEqual('https://public.opendatasoft.com/api/explore/v2.1/catalog/');
            return JSON.stringify(apiResponse);
        });
        const client = new ApiClient({ domain: 'public' });
        const response = await client.get('catalog/');
        expect(response).toEqual(apiResponse);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should add the api key', async () => {
        const apiResponse = { any: 'any' };
        fetchMock.once(async (req) => {
            expect(req.headers.get('Authorization')).toEqual('ApiKey 1234');
            return JSON.stringify(apiResponse);
        });
        const client = new ApiClient({ apiKey: '1234' });
        const response = await client.get(fromCatalog().itself());
        expect(response).toEqual(apiResponse);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should add HTTP headers', async () => {
        const apiResponse = { any: 'any' };
        fetchMock.once(async (req) => {
            expect(req.headers.get('headerKey')).toEqual('headerValue');
            return JSON.stringify(apiResponse);
        });
        const headers = { headerKey: 'headerValue' };
        const client = new ApiClient({ headers });
        const response = await client.get(fromCatalog().itself());
        expect(response).toEqual(apiResponse);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should add the api key with HTTP headers', async () => {
        const apiResponse = { any: 'any' };
        fetchMock.once(async (req) => {
            expect(req.headers.get('headerKey')).toEqual('headerValue');
            expect(req.headers.get('Authorization')).toEqual('ApiKey 1234');
            return JSON.stringify(apiResponse);
        });
        const headers = { headerKey: 'headerValue' };
        const client = new ApiClient({ headers, apiKey: '1234' });
        const response = await client.get(fromCatalog().itself());
        expect(response).toEqual(apiResponse);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('works with the query builder', async () => {
        const apiResponse = { any: 'any' };
        fetchMock.once(async (req) => {
            expect(req.url).toEqual(
                'https://public.opendatasoft.com/api/explore/v2.1/catalog/facets/?facet=facet1&facet=facet2&refine=%60facet1%60%3Avalue'
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

    it('allow request and response interception', async () => {
        fetchMock.once(async (req) => {
            expect(req.headers.get('x-custom')).toEqual('custom');
            return 'response';
        });
        const client = new ApiClient({
            /* (Optional) Allow you to update the request before it is send. */
            interceptRequest: async (request) => {
                request.headers.append('x-custom', 'custom');
                return request;
            },

            /* (Optional) Allow you to intercept the response before it is returned */
            interceptResponse: async (response) => {
                const apiResponse = await response.text();
                return `${apiResponse}_intercepted`;
            },
        });

        const response = await client.get('catalog/');
        expect(response).toEqual('response_intercepted');
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('Handle UserError', async () => {
        fetchMock.once(async () => ({
            status: 400,
            body: 'Try turning it on and off',
        }));
        const client = new ApiClient();
        await expect(client.get('whatever')).rejects.toBeInstanceOf(UserError);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('Handle ServerError', async () => {
        fetchMock.once(async () => ({
            status: 500,
            body: '💥',
        }));
        const client = new ApiClient();
        const expectRequest = expect(client.get('whatever'));
        await expectRequest.rejects.toBeInstanceOf(ServerError);
        await expectRequest.rejects.toHaveProperty('response');
        await expectRequest.rejects.toHaveProperty(['details', 'message'], '💥');
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('Handle AuthenticationError', async () => {
        fetchMock.once(async () => ({
            status: 401,
            body: 'New api, who dis ?',
        }));
        const client = new ApiClient();
        await expect(client.get('whatever')).rejects.toBeInstanceOf(AuthenticationError);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('Handle NotFoundError', async () => {
        fetchMock.once(async () => ({
            status: 404,
            body: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        }));
        const client = new ApiClient();
        await expect(client.get('whatever')).rejects.toBeInstanceOf(NotFoundError);
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});
