# @opendatasoft/api-client ![CI status](https://github.com/opendatasoft/ods-dataviz-sdk/workflows/CI/badge.svg)

This package implements a Typescript/Javascript client library for [Opendatasoft's Search APIv2](https://help.opendatasoft.com/apis/ods-search-v2/#search-api-v2).

- [Installation](#installation)
- [Get started](#get-started)
- [Usage](#usage)
  - [ApiClient](#ApiClient)
  - [Query builder](#query-builder)
- [Frameworks](#frameworks)
- [Resources](#resources)
- [Contributing](#contributing)
- [License](#license)

## Installation

The client is available as an npm package.

With npm:

```shell
npm install @opendatasoft/api-client
```

With yarn:

```shell
yarn add @opendatasoft/api-client
```

> ⚠️ **Warning**: You have to polyfill [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) in [older browsers](https://github.com/github/fetch) and [node](https://github.com/node-fetch/node-fetch). You can use [cross-fetch](https://github.com/lquixada/cross-fetch) to do both at once.

## Get started

Here is a quick example to get you started:

```javascript
import { ApiClient, fromCatalog } from '@opendatasoft/api-client';

// Initialize the Client by indicating the domain to request.
const client = new ApiClient({ domain: "documentation-resources" });

// Create the query to run.
const query = fromCatalog() // From the domain catalog
    .dataset("doc-geonames-cities-5000") // ... we'll use the dataset "doc-geonames-cities-5000"
    .aggregates() // ... in order to make an aggregation.
    .where("country_code:'FR'") // // Filter records where country_code === "FR".
    .groupBy("name as city, population") // Select the fields "name" and "population".
    .orderBy("-population") // Sort by population in descending order.
    .limit(10) // But we only want the first 10 most populated cities.
    .toString(); // Then finally, we convert our query into a string.

// Now, run the query.
client.get(query)
    .then(response => console.log(response))
    .catch(error => console.error(error));
```

[CodeSandbox sample](https://codesandbox.io/s/api-clientget-started-be0xu?file=/src/index.js)

## Usage

### ApiClient

The [`ApiClient`](docs/classes/client.apiclient.md) class can be used to send API request and get back an API response.

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
      fetch: window.fetch,

      /* (Optional) Allow you to update the request before it is send. */
      interceptRequest: async (request) => {
            console.log(request);
            request.headers.append('x-custom', 'custom');
            return request;
      },

      /* (Optional) Allow you to intercept the response before it is returned */
      interceptResponse: async (response) => {
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

The client also includes a query builder.

Start with one of the following entry points:

- `fromCatalog()`: access the domain catalog

- `fromMonitoring()`: access monitoring datasets

- `fromDataNetwork()`: access any datasets on [Opendatasoft's data network](https://data.opendatasoft.com/)

From there, your IDE should provide autocompletion. If not, you can always check the [the query builder reference](docs/modules/odsql.md).

```javascript
import {
    ApiClient,
    fromCatalog,
    fromDataNetwork,
    fromMonitoring
} from '@opendatasoft/api-client';

const client = new ApiClient({
      interceptRequest: async (request) => {
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

The [`Query`](docs/classes/odsql.query.md) interface expose convenient parameters of an API request.

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

**⚠️ FIXME:** Add CodeSandbox sample.

### Angular

**⚠️ FIXME:** Add CodeSandbox sample.

### Vue

**⚠️ FIXME:** Add CodeSandbox sample.

### Svelte

**⚠️ FIXME:** Add CodeSandbox sample.

## Resources

- [Opendatasoft's APIv2 documentation](https://help.opendatasoft.com/apis/ods-search-v2/#search-api-v2)
- [API Client Reference](docs/globals.md)
- [Data Network API Console](https://data.opendatasoft.com/api/v2/console)

## Contributing

This project welcomes contributions and suggestions! To do so, take a look at our [Contributing Guide](CONTRIBUTING.md). It contains setup instructions, tools and scripts that can be useful if you need to work on all packages at the same time.

## License

This project is licensed under the [MIT license](../../LICENSE).
