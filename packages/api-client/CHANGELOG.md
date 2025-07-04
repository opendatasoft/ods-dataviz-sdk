# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [21.8.0](https://github.com/opendatasoft/ods-dataviz-sdk/compare/@opendatasoft/api-client@21.7.0...@opendatasoft/api-client@21.8.0) (2025-06-30)


### Features

* **api-client:** Support timezone parameter ([101310a](https://github.com/opendatasoft/ods-dataviz-sdk/commit/101310a935d974662c2a8e9a85822ea66e223a11))





# [21.7.0](https://github.com/opendatasoft/ods-dataviz-sdk/compare/@opendatasoft/api-client@21.6.2...@opendatasoft/api-client@21.7.0) (2025-03-14)


### Features

* **odsql functions:** add `lower` function ([0bff53e](https://github.com/opendatasoft/ods-dataviz-sdk/commit/0bff53e701f1146a6961bd4f8af8e5e5fe4da905))
* **types:** add metadata templates field type and constant ([c6ed575](https://github.com/opendatasoft/ods-dataviz-sdk/commit/c6ed575100d1e78fe35a1f489210e38a32245541))





## [21.6.2](https://github.com/opendatasoft/ods-dataviz-sdk/compare/@opendatasoft/api-client@21.6.1...@opendatasoft/api-client@21.6.2) (2025-02-12)


### Bug Fixes

* **api-client:** Typo in attachment property name and type ([062ea49](https://github.com/opendatasoft/ods-dataviz-sdk/commit/062ea49d2f70f56b580994bd8d43ceec0dbcd45e))





## [21.6.1](https://github.com/opendatasoft/ods-dataviz-sdk/compare/@opendatasoft/api-client@21.6.0...@opendatasoft/api-client@21.6.1) (2025-02-04)

**Note:** Version bump only for package @opendatasoft/api-client





# [21.6.0](https://github.com/opendatasoft/ods-dataviz-sdk/compare/@opendatasoft/api-client@21.5.1...@opendatasoft/api-client@21.6.0) (2024-11-06)


### Features

* **api-client:** add semantic_type to DatasetField ([6d58834](https://github.com/opendatasoft/ods-dataviz-sdk/commit/6d58834c0394d4d6f379826bfeef23c07202f8cd))





## [21.5.1](https://github.com/opendatasoft/ods-dataviz-sdk/compare/@opendatasoft/api-client@21.5.0...@opendatasoft/api-client@21.5.1) (2024-09-20)


### Bug Fixes

* **api-client:** update dataset exports formats ([#260](https://github.com/opendatasoft/ods-dataviz-sdk/issues/260)) ([91704ce](https://github.com/opendatasoft/ods-dataviz-sdk/commit/91704ce240a2b680a2f6186b04c8a79005becf42))





# [21.4.0](https://github.com/opendatasoft/ods-dataviz-sdk/compare/@opendatasoft/api-client@21.3.0...@opendatasoft/api-client@21.4.0) (2024-04-12)


### Features

* upgrade to node 20 ([#228](https://github.com/opendatasoft/ods-dataviz-sdk/issues/228)) ([2e9803e](https://github.com/opendatasoft/ods-dataviz-sdk/commit/2e9803e19919fee924c8e27fed836ae42b8b1085))





# [21.3.0](https://github.com/opendatasoft/ods-dataviz-sdk/compare/@opendatasoft/api-client@21.2.0...@opendatasoft/api-client@21.3.0) (2024-03-27)


### Features

* Adding assets to catalog queries ([110d5c8](https://github.com/opendatasoft/ods-dataviz-sdk/commit/110d5c8216e72255aea5a507b96626a1ef76ead7))





# [21.2.0](https://github.com/opendatasoft/ods-dataviz-sdk/compare/@opendatasoft/api-client@21.1.2...@opendatasoft/api-client@21.2.0) (2024-01-10)


### Features

* **api-client:** Add new api client option: headers ([985f883](https://github.com/opendatasoft/ods-dataviz-sdk/commit/985f8839ccb857b60f35bdc1187558cb018a2a95))





## [21.1.2](https://github.com/opendatasoft/ods-dataviz-sdk/compare/@opendatasoft/api-client@21.1.1...@opendatasoft/api-client@21.1.2) (2023-10-12)


### Bug Fixes

* **api-client:** Fix Facet types to match API v2.1 ([914e36d](https://github.com/opendatasoft/ods-dataviz-sdk/commit/914e36db2b072b1705e94780c8bc48b27861d543))





## [21.1.1](https://github.com/opendatasoft/ods-dataviz-sdk/compare/@opendatasoft/api-client@21.1.0...@opendatasoft/api-client@21.1.1) (2023-09-22)


### Bug Fixes

* add MVT dataset export format ([0b0a746](https://github.com/opendatasoft/ods-dataviz-sdk/commit/0b0a746121195eb0f5b9837b8459a431f9ef5fa0))
* add typing for API export ([511bb8b](https://github.com/opendatasoft/ods-dataviz-sdk/commit/511bb8ba4f7d305c0d1f6979e897b268b5f94d1f))





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
