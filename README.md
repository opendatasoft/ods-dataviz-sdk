# Opendatasoft SDKs for data visualization

This project is a development root for two packages:
- `ods-api-client`: An API client for the Opendatasoft V2 API
- `visualizations`: Components to easily build dashboards and visualizations on top of an Opendatasoft platform

It contains setup instructions, tools and scripts that can be useful if you need to work on both packages at the same time.

### Setup
Install both sub packages, linking locally beforehand if necessary
```
cd packages/api-client
npm install

cd ../visualizations
npm install ../api-client
npm install
```

Then install the root package:
```
cd ../..
npm install
```