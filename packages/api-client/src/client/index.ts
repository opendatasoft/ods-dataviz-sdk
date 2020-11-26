import update from 'immutability-helper';
import {
  AuthenticationError,
  NotFoundError,
  ServerError,
  UserError,
} from './error';
import { ApiResponse } from './types';

const API_KEY_AUTH_TYPE = 'ApiKey';

type RequestInterceptor = (request: Request) => Request;
type ResponseInterceptor = (response: Response) => Response;
export interface ApiClientOptions {
  domain?: string;
  apiKey?: string;
  fetch?: WindowOrWorkerGlobalScope['fetch'];
  interceptRequest?: RequestInterceptor;
  interceptResponse?: ResponseInterceptor;
}

interface ApiClientConfiguration {
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
    const fetch = options?.fetch || window?.fetch || global?.fetch;

    if (!fetch) {
      throw new Error(
        'fetch() was not found, try installing a polyfill in the browser or node-fetch in nodejs. You can pass fetch as an option to the api client.'
      );
    }

    if (!URL) {
      throw new Error('URL() was not found, try installing a polyfill.');
    }

    const domain = options?.domain || window?.location.origin;
    if (!domain) {
      throw new Error('Missing domain');
    }

    this.defaultConfig = buildConfig(options, {
      baseUrl: computeBaseUrl(domain),
      fetch,
    });
  }

  async get(query: string, options?: ApiClientOptions): Promise<ApiResponse> {
    const config = buildConfig(options, this.defaultConfig);

    // Build the URL
    const url = new URL(query, config.baseUrl);
    url.searchParams.sort(); // Url stability is HTTP cache friendly

    // Build the Headers
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    if (config.apiKey) {
      headers.append('Authorization', `${API_KEY_AUTH_TYPE} ${config.apiKey}`);
    }

    // Build Request
    let request = new Request(url.toJSON(), {
      method: 'GET',
      headers,
      credentials: 'same-origin',
    });
    if (config.interceptRequest) request = config.interceptRequest(request);

    // Send request
    let fetchResponse = await fetch(request);
    if (config.interceptResponse)
      fetchResponse = config.interceptResponse(fetchResponse);
    const data = await fetchResponse.json();

    if (fetchResponse.ok) {
      return data;
    } else {
      if (fetchResponse.status === 401) {
        throw new AuthenticationError(fetchResponse, data);
      }
      if (fetchResponse.status === 404) {
        throw new NotFoundError(fetchResponse, data);
      }
      if (fetchResponse.status < 500) {
        throw new UserError(fetchResponse, data);
      }
      throw new ServerError(fetchResponse, data);
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

  const {
    domain,
    fetch,
    apiKey,
    interceptRequest,
    interceptResponse,
  } = apiClientOptions;

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
