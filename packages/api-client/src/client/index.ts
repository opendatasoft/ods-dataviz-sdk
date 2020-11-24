import update from 'immutability-helper';

const API_KEY_PARAM = 'apiKey';

export interface ApiClientOptions {
  domain?: string;
  apiKey?: string;
  fetch?: WindowOrWorkerGlobalScope['fetch'];
}

interface ApiClientConfiguration {
  origin: string;
  apiKey?: string;
  fetch: WindowOrWorkerGlobalScope['fetch'];
}

export class ApiClient {
  readonly defaultConfig: ApiClientConfiguration;

  /**
   * Constructs an instance of {@link ApiClient}
   */
  constructor(options?: ApiClientOptions) {
    const fetch = options?.fetch || global?.fetch;

    if (!fetch) {
      throw new Error(
        'fetch was not found, try installing a polyfill in the browser or node-fetch in node js. You can pass fetch as an option to the api client'
      );
    }

    this.defaultConfig = buildConfig(options, {
      origin: '',
      fetch,
    });
  }

  async get(query: string, options?: ApiClientOptions) {
    const config = buildConfig(options, this.defaultConfig);

    let url = new URL(query, config.origin);

    if (url.searchParams.get(API_KEY_PARAM) !== null) {
      const apiKey = config.apiKey;
      if (apiKey) url.searchParams.set(API_KEY_PARAM, apiKey);
    }

    // Stable url to be cache friendly
    url.searchParams.sort();

    const fetchResponse = await fetch(url.toString());

    return fetchResponse;
  }
}

function buildConfig(
  apiClientOptions: ApiClientOptions | undefined,
  defaultConfig: ApiClientConfiguration
): ApiClientConfiguration {
  if (!apiClientOptions) {
    return defaultConfig;
  }

  const { domain, fetch, apiKey } = apiClientOptions;

  const newConfig: Partial<ApiClientConfiguration> = {};

  if (domain) newConfig.origin = computeOrigin(domain);
  if (apiKey) newConfig.apiKey = apiKey;
  if (fetch) newConfig.fetch = fetch;

  return update(defaultConfig, { $merge: newConfig });
}

function computeOrigin(domain: string): string {
  let origin;
  if (domain.startsWith('http://') || domain.startsWith('https://')) {
    origin = domain;
  } else {
    origin = `https://${domain}.opendatasoft.com`;
  }
  return origin;
}
