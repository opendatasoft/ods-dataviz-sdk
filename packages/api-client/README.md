# @opendatasoft/api-client

TODO: Insert badges.

This package implement a Typescript/Javascript client library for Opendatasoft's [Search API v2](https://help.opendatasoft.com/apis/ods-search-v2/#search-api-v2).

## Installation

The client is available as an npm package.

With npm :

```shell
npm install @opendatasoft/api-client
```

With yarn :

```shell
yarn add @opendatasoft/api-client
```

ℹ️ You have to polyfill [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) in [older browsers](https://github.com/github/fetch) and [node](https://github.com/node-fetch/node-fetch). You can use [cross-fetch](https://github.com/lquixada/cross-fetch) to do both at once.

## Get started

Here is a quick example to get you started :

```javascript
import { ApiClient, fromCatalog } from '@opendatasoft/api-client';

const client = new ApiClient({ domain: 'public' });
const query = fromCatalog().facets();

client.get(query)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));

```

**⚠️ FIXME :** Add codesanbox sample.

## Usage

### ApiClient

The `ApiClient` class can be used to send api request and get back an api response.

It takes an optional configuration object.

```javascript
import { ApiClient } from '@opendatasoft/api-client';

const client = new ApiClient({

      /* (Optional) authenticate through an api key */
      apiKey: 'secret',

      /* (Optional) The Opendatasoft domain identifier or url.
         If missing, in the browser, the client will use the current host. */
      domain: 'public' || 'https://public.opendatasoft.com',

      /* (Optional) A fetch-compatible API for making a request. */
      fetch : window.fetch,

      /* (Optional) Allow you to update the request before it is send. */
      interceptRequest : async (request) => {
            console.log(request);
            request.headers.append('x-custom', 'custom');
            return request;
      },

      /* (Optional) Allow you to intercept the response before it is returned */
      interceptResponse : async (response) => {
            const apiResponse = await response.json();
            delete apiResponse['links'];
            return apiResponse;
      }
});
```

You can reuse client instances.

## Frameworks

### React

### Angular

### Vue

### Svelte

## Resources

- [Api documentation](https://help.opendatasoft.com/apis/ods-search-v2/#search-api-v2)
- [Data network api console](https://data.opendatasoft.com/api/v2/console)

## How to contribute

Take a look at our [contribution guide](CONTRIBUTING.md) if you're interested in helping.
