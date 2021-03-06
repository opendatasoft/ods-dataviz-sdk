**[@opendatasoft/api-client](README.md)**

> [Globals](globals.md)

# @opendatasoft/api-client

![CI status](https://github.com/opendatasoft/ods-dataviz-sdk/workflows/CI/badge.svg)

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

> ⚠️ **Warning**: You have to polyfill [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) in [older browsers](https://github.com/github/fetch) and [node](https://github.com/node-fetch/node-fetch). You can use [cross-fetch](https://github.com/lquixada/cross-fetch) to do both at once.

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

**⚠️ FIXME :** Add CodeSandbox sample.

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

Use the method `get` to call the api. It accepts an url or a query object. It return a promise containing the api response or throw an error.

```javascript
import { ApiClient } from '@opendatasoft/api-client';

(async () => {
      const client = new ApiClient();
      const response = await client.get('catalog/datasets?limit=10');
      console.log(response);
      /*
       {
        total_count: 10,
        links: [...],
        datasets: [...]
      }
      */
})();
```

In case of failure, the Error returned will always be one of the following type.

```javascript
import { AuthenticationError, NotFoundError, ServerError, UserError } from '@opendatasoft/api-client/client/error';
```

You can use that to display a better error message.

### Query builder

The client also include a query builder.

Start with one the entry point :

- `fromCatalog()` : query the domain catalog

- `fromMonitoring()`: access monitoring datasets

- `fromDataNetwork()`: access any datasets on [Opendatasoft's data network](https://data.opendatasoft.com/)

From there, your IDE should provide autocompletion. If not, you can always check the [client reference](docs/globals.md).

```javascript
import {
    ApiClient,
    fromCatalog,
    fromDataNetwork,
    fromMonitoring
} from '@opendatasoft/api-client';

const client = new ApiClient({
      interceptRequest : async (request) => {
            console.log(request.url); // Log the url
            return request;
      }
});

// ../monitoring/
client.get(fromMonitoring().itself());

// ../catalog/datasets/
client.get(fromCatalog().datasets());

// ../opendatasoft/datasets/sirene@data/facets/?lang=fr
client.get(fromDataNetwork().dataset('sirene@data').facets().lang('fr'));

// ../catalog/datasets/?select=dataset_id%2C+records_count
client.get(fromCatalog().datasets().select('dataset_id, records_count'));
```

The `Query` interface expose convenient parameters of an API request.

```javascript
import {
    ApiClient,
    fromCatalog,
    field,
    string,
    dateTime,
    date,
    all,
    one,
} from '@opendatasoft/api-client';

fromCatalog().aggregates()
   .select("count(*), avg(f)") // You can select fields
   .where("field2 > 2") // Add a where clause
   .where("field3 > 3") // This replace the previous clause
   .where(condition => condition + " AND field4: 4") // This combine both conditions
   .where(filter => all(filter, "field4:4", "field5: 5")) // condition1 AND condition2...
   .where(one("field4:4", "field5:5")) //condition1 OR condition2...
   .where(`${field("name")}:${string("paul")}`) // string and field escaping
   .where(`${field("day")} < ${date(new Date())}`) // format Date with date or dateTime
   .groupBy(`${field("day")} , ${field("a")}+${field("b")}`) // Add a group by clause
   .orderBy("count(*)") // Or and order by clause
   .limit(10) // Set a limit
   .offset(10) // Or an offset
   .limit(currentLimit => currentLimit + 10) // useful for pagination
   .refine("field:value") // Use facet refine for faceted navigation
   .exclude("field:value") // Same for excluding
   .lang("fr") // Force a language
```

## Frameworks

You can use the client with any frontend frameworks.

Here are some samples to get you started.

### React

**⚠️ FIXME :** Add CodeSandbox sample.

### Angular

**⚠️ FIXME :** Add CodeSandbox sample.

### Vue

**⚠️ FIXME :** Add CodeSandbox sample.

### Svelte

**⚠️ FIXME :** Add CodeSandbox sample.

## Resources

- [Api documentation](https://help.opendatasoft.com/apis/ods-search-v2/#search-api-v2)
- [Data network api console](https://data.opendatasoft.com/api/v2/console)

## How to contribute

Take a look at our [contribution guide](CONTRIBUTING.md) if you're interested in helping.
