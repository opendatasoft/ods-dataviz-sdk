# Opendatasoft's libraries for Data Visualization ![CI status](https://github.com/opendatasoft/ods-dataviz-sdk/workflows/CI/badge.svg)

A monorepo for the Opendatasoft's libraries:

- [`@opendatasoft/api-client`](packages/api-client/): An API client for the [Opendatasoft's Explore API v2.1](https://help.opendatasoft.com/apis/ods-explore-v2/explore_v2.1.html).
- [`@opendatasoft/visualizations`](packages/visualizations/): Components to easily build dashboards and visualizations on top of an Opendatasoft platform.
- [`@opendatasoft/visualizations-react`](packages/visualizations-react/): A convenient React wrapper for the visualizations components.

## Running packages locally
Install the monorepo with: `npm install` (`lerna boostrap` is now deprecated).
Run the all the packages with: `npm run watch`. Changes will propagate from one repo to the other.

## Contributing

This project welcomes contributions and suggestions! To do so, take a look at our [Contributing Guide](CONTRIBUTING.md). It contains setup instructions, tools and scripts that can be useful if you need to work on all packages at the same time.

## License

This project is licensed under the [MIT license](LICENSE).
