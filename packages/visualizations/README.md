# @opendatasoft/visualizations ![CI status](https://github.com/opendatasoft/ods-dataviz-sdk/workflows/CI/badge.svg)

This package provides a set of visualization components. It is convenient to use those components with the [`@opendatasoft/api-client`](packages/api-client/) package which is in charge of querying the data.

- [Installation](#installation)
- [Get started](#get-started)
- [Contributing](#contributing)
- [License](#license)

## Installation

The client is available as an npm package.

With npm:

```shell
npm install @opendatasoft/visualizations
```

With yarn:

```shell
yarn add @opendatasoft/visualizations
```

## Get started

Here is a quick example of setting up a visualization as well as using the `@opendatasoft/api-client` package:

```javascript
import { ApiClient, fromCatalog } from "@opendatasoft/api-client";
import { Chart } from "@opendatasoft/visualizations";

const container = document.getElementsByTagName("body")[0];

const client = new ApiClient({ domain: "public" });

const query = fromCatalog()
    .dataset("worldcitiespop")
    .aggregates()
    .where("country:'fr'")
    .groupBy("city as x, population as y")
    .orderBy("-y")
    .limit(10)
    .toString();

client.get(query).then(({ aggregations }) => {
    new Chart(
        container,
        {
            value: aggregations,
        },
        {
            type: "bar",
            xAxis: "x",
            yAxis: "y",
            label: "France's most populated cities",
            colorConfiguration: {
                colors: [
                    "rgba(254,14,23,0.5)",
                    "rgba(54,174,23,0.5)",
                    "rgba(200,74,223,0.5)",
                    "rgba(255,255,23,0.5)",
                    "rgba(54,74,223,0.5)",
                ],
            },
        },
    );
});
```

**⚠️ FIXME:** Add CodeSandbox sample.

## Contributing

This project welcomes contributions and suggestions! To do so, take a look at our [Contributing Guide](CONTRIBUTING.md). It contains setup instructions, tools and scripts that can be useful if you need to work on all packages at the same time.

## License

This project is licensed under the [MIT license](LICENSE).
