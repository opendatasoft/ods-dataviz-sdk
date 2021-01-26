import update from 'immutability-helper';
import { Query } from '../odsql';
import { AuthenticationError, NotFoundError, ServerError, UserError } from './error';
import { ApiResponse } from './types';

const API_KEY_AUTH_TYPE = 'ApiKey';

// Using the UMD bundle in ObservableHQ, the error "ReferenceError: global is not defined" is returned.
// ... I'm not sure why it behaves that way, but this fixes the issue:
const _global: any = typeof global !== "undefined" ? global :
    typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window : {};

export type RequestInterceptor = (request: Request) => Promise<Request>;
export type ResponseInterceptor = (response: Response) => Promise<ApiResponse>;

export interface ApiClientOptions {
    domain?: string;
    apiKey?: string;
    fetch?: WindowOrWorkerGlobalScope['fetch'];
    interceptRequest?: RequestInterceptor;
    interceptResponse?: ResponseInterceptor;
}

export interface ApiClientConfiguration {
    baseUrl: string;
    apiKey?: string;
    fetch: WindowOrWorkerGlobalScope['fetch'];
    interceptRequest?: RequestInterceptor;
    interceptResponse?: ResponseInterceptor;
}

export class ApiClient {
    readonly defaultConfig: ApiClientConfiguration;

    /**
     * Constructs an instance of {@link ApiClient}
     */
    constructor(options?: ApiClientOptions) {
        const fetch = options?.fetch || _global?.fetch;

        if (!fetch) {
            throw new Error(
                'fetch() was not found, try installing a polyfill in the browser or node-fetch in nodejs. You can pass fetch as an option to the api client.'
            );
        }

        const domain = options?.domain || _global?.location?.origin;
        if (!domain) {
            throw new Error('Missing domain');
        }

        this.defaultConfig = buildConfig(options, {
            baseUrl: computeBaseUrl(domain),
            fetch,
        });
    }

    async get(query: string | Query, options?: ApiClientOptions): Promise<ApiResponse> {
        const config = buildConfig(options, this.defaultConfig);

        // Build the URL
        let path = typeof query === 'string' ? query : query.toString();
        if (path.startsWith('/')) path = path.slice(1);
        const url = new URL(path, config.baseUrl);
        url.searchParams.sort(); // Url stability is HTTP cache friendly

        // Build the Headers
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        if (config.apiKey) {
            headers.append('Authorization', `${API_KEY_AUTH_TYPE} ${config.apiKey}`);
        }

        // Build Request
        let request = new Request(url.toString(), {
            method: 'GET',
            headers,
            credentials: 'same-origin',
        });
        if (config.interceptRequest) request = await config.interceptRequest(request);

        // Send request
        const fetch = config.fetch;
        let fetchResponse = await fetch(request);
        if (config.interceptResponse) return await config.interceptResponse(fetchResponse);

        if (fetchResponse.ok) {
            const data = await fetchResponse.json();
            return data;
        } else {
            let errorData = undefined;
            const response = await fetchResponse.text();
            if (response) {
                try {
                    errorData = JSON.parse(response);
                } catch (e) {}
            }
            if (!errorData && (response || fetchResponse.statusText)) {
                errorData = {
                    message: response || fetchResponse.statusText,
                };
            }

            if (fetchResponse.status === 401) {
                throw new AuthenticationError(fetchResponse, errorData || 'authentication-error');
            }
            if (fetchResponse.status === 404) {
                throw new NotFoundError(fetchResponse, errorData || 'not-found');
            }
            if (fetchResponse.status < 500) {
                throw new UserError(fetchResponse, errorData || 'user-error');
            }
            throw new ServerError(fetchResponse, errorData || 'server-error');
        }
    }
}

function buildConfig(
    apiClientOptions: ApiClientOptions | undefined,
    defaultConfig: ApiClientConfiguration
): ApiClientConfiguration {
    if (!apiClientOptions) {
        return defaultConfig;
    }

    const { domain, fetch, apiKey, interceptRequest, interceptResponse } = apiClientOptions;

    const newConfig: Partial<ApiClientConfiguration> = {};

    if (domain) newConfig.baseUrl = computeBaseUrl(domain);
    if (apiKey) newConfig.apiKey = apiKey;
    if (fetch) newConfig.fetch = fetch;
    if (interceptRequest) newConfig.interceptRequest = interceptRequest;
    if (interceptResponse) newConfig.interceptResponse = interceptResponse;

    return update(defaultConfig, { $merge: newConfig });
}

function computeBaseUrl(domain: string): string {
    let baseUrl;
    if (domain.startsWith('http://') || domain.startsWith('https://')) {
        baseUrl = domain;
    } else {
        baseUrl = `https://${domain}.opendatasoft.com`;
    }
    if (!baseUrl.endsWith('/')) {
        baseUrl += '/';
    }
    baseUrl += 'api/v2/';

    return baseUrl;
}
