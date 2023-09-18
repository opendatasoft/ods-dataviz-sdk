# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [21.1.1-beta-poimap.2](https://github.com/opendatasoft/ods-dataviz-sdk/compare/@opendatasoft/api-client@21.1.0...@opendatasoft/api-client@21.1.1-beta-poimap.2) (2023-09-18)


### Bug Fixes

* add MVT dataset export format ([a29e10c](https://github.com/opendatasoft/ods-dataviz-sdk/commit/a29e10c7ee8d22626dbd1c9afd97d997734135ea))
* add typing for API export ([d28b8c8](https://github.com/opendatasoft/ods-dataviz-sdk/commit/d28b8c88df5e5e10449e000fe07a46468b7c631f))





## [21.1.1-beta-poimap.1](https://github.com/opendatasoft/ods-dataviz-sdk/compare/@opendatasoft/api-client@21.1.0...@opendatasoft/api-client@21.1.1-beta-poimap.1) (2023-09-07)


### Bug Fixes

* add MVT dataset export format ([54e77f2](https://github.com/opendatasoft/ods-dataviz-sdk/commit/54e77f27e6912972d6f67e27f8664d203a97eeab))
* add typing for API export ([92495e5](https://github.com/opendatasoft/ods-dataviz-sdk/commit/92495e5985bbf6e3d43400673b2fb4afce82fc38))





## [21.1.1-beta-poimap.0](https://github.com/opendatasoft/ods-dataviz-sdk/compare/@opendatasoft/api-client@21.1.0...@opendatasoft/api-client@21.1.1-beta-poimap.0) (2023-09-01)


### Bug Fixes

* add MVT dataset export format ([8c1e2ff](https://github.com/opendatasoft/ods-dataviz-sdk/commit/8c1e2fffe975e0735b0067173ec3971e68770f07))
* add typing for API export ([cc3919e](https://github.com/opendatasoft/ods-dataviz-sdk/commit/cc3919e8f18c1ae182c9ea8f534fd3cc9f079657))





# [21.1.0](https://github.com/opendatasoft/ods-dataviz-sdk/compare/@opendatasoft/api-client@21.0.0...@opendatasoft/api-client@21.1.0) (2023-08-31)


### Features

* Add Record endpoint in api-client ([3d68ea7](https://github.com/opendatasoft/ods-dataviz-sdk/commit/3d68ea7fab9b7eada65230716ed8bc0982910574))





# [21.0.0](https://github.com/opendatasoft/ods-dataviz-sdk/compare/@opendatasoft/api-client@21.1.0-beta.0...@opendatasoft/api-client@21.0.0) (2023-06-26)

Welcome to the first stable release of `@opendatasoft/api-client`!

This MAJOR release is meant to coincide with [Opendatasoft's Explore API v2.1](https://help.opendatasoft.com/apis/ods-explore-v2/explore_v2.1.html) release and includes a few new features.

**New clauses**: Clauses help you build ready to use [ODSQL predicates](https://help.opendatasoft.com/apis/ods-explore-v2/explore_v2.1.html#section/ODSQL-predicates).
- The `textStartWith()` function is for a search where the searched string matches text fields that contain strings beginning with the searched string. Equivalent to [ODSQL startsWith](https://help.opendatasoft.com/apis/ods-explore-v2/explore_v2.1.html#section/ODSQL-predicates/startswith()).
- The `textSuggest()` function is for a search where the searched string matches the text fields that contain individual terms beginning the searched string. Equivalent to [ODSQL suggest](https://help.opendatasoft.com/apis/ods-explore-v2/explore_v2.1.html#section/ODSQL-predicates/suggest()).
- The `textSearch()` function is for fuzzy searches that find matches even if the searched string is not an exact match. Equivalent to [ODSQL search](https://help.opendatasoft.com/apis/ods-explore-v2/explore_v2.1.html#section/ODSQL-predicates/search()).

All theses clauses accept a second optional parameter (`textFields` : `string[]`) to specify the fields to search in. By default the search is done on all the fields.

**Deprecation warnings**: When an API response contains the `ODS-Explore-API-Deprecation` header, by default, a warning message will be showed in the console.
It can be disabled by setting up the `hideDeprecatedWarning` option to `false` when initiating the Client.
To learn more about deprecation warnings, follow this [link](https://help.opendatasoft.com/apis/ods-explore-v2/explore_v2.1.html#section/Versioning/Deprecation-warnings).

**Better TS support for exports functions**: `ExportCatalogFormat` and `ExportDatasetFormat` list available export formats for a catalog or a dataset.

## 🆙 Upgrade guide
- The `query()` function has been removed. Use the `records()` function instead. ⚠️ danger Response format has also changed.
- Previously deprecated, the `aggregates()` function has been removed. Use the `records()` function instead.
- Response format for the `records()` query has changed. `links` has been removed and `record` replaced by `results`.
- Response format for the `datasets()` query has changed. `dataset` has been replaced by `results`.
- The `textSearch()` clause has been renamed to `textSuggest()`. ⚠️ `textSearch()` still exists but is now a clause to do a fuzzy search that finds matches even if the searched string is not an exact match. Equivalent to [ODSQL search predicate](https://help.opendatasoft.com/apis/ods-explore-v2/explore_v2.1.html#section/ODSQL-predicates/search()).
- The `exports()` function have been renamed to `export()`.
- `XLS` export format is removed and changed to `XLSX`.


## About versioning

In the [documentation](https://github.com/opendatasoft/ods-dataviz-sdk/tree/main/packages/api-client#versioning), you can learn more about the versioning of this package and why we've chosen to release our first stable package as version `21.0.0.`.

## Release notes
### Features

- New and updated clauses: `textStartWith()`, `textSearch()` and `textSuggest()`.
- types: Add `ExportCatalogFormat` and `ExportDatasetFormat` types.
- Warning messages are showed in the console when the response API contains an `ODS-Explore-API-Deprecation` header.
