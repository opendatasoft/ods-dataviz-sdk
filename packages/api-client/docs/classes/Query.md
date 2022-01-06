[@opendatasoft/api-client](../README.md) / Query

# Class: Query

## Table of contents

### Constructors

- [constructor](Query.md#constructor)

### Methods

- [append](Query.md#append)
- [exclude](Query.md#exclude)
- [facet](Query.md#facet)
- [getPath](Query.md#getpath)
- [getSearchParams](Query.md#getsearchparams)
- [groupBy](Query.md#groupby)
- [lang](Query.md#lang)
- [limit](Query.md#limit)
- [offset](Query.md#offset)
- [orderBy](Query.md#orderby)
- [refine](Query.md#refine)
- [select](Query.md#select)
- [set](Query.md#set)
- [toString](Query.md#tostring)
- [unset](Query.md#unset)
- [update](Query.md#update)
- [where](Query.md#where)

## Constructors

### constructor

• **new Query**(`path?`, `init?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `path` | `string` | `''` |
| `init?` | `Record`<`string`, `string` \| `string`[]\> | `undefined` |

#### Defined in

[src/odsql/index.ts:12](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L12)

## Methods

### append

▸ **append**(`name`, `value`): [`Query`](Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `string` |

#### Returns

[`Query`](Query.md)

#### Defined in

[src/odsql/index.ts:69](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L69)

___

### exclude

▸ **exclude**(`exclude`): [`Query`](Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `exclude` | `string` |

#### Returns

[`Query`](Query.md)

#### Defined in

[src/odsql/index.ts:120](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L120)

___

### facet

▸ **facet**(`facet`): [`Query`](Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `facet` | `string` |

#### Returns

[`Query`](Query.md)

#### Defined in

[src/odsql/index.ts:112](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L112)

___

### getPath

▸ **getPath**(): `string`

#### Returns

`string`

#### Defined in

[src/odsql/index.ts:17](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L17)

___

### getSearchParams

▸ **getSearchParams**(): `URLSearchParams`

#### Returns

`URLSearchParams`

#### Defined in

[src/odsql/index.ts:21](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L21)

___

### groupBy

▸ **groupBy**(`expressions`): [`Query`](Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expressions` | [`StringOrUpdater`](../README.md#stringorupdater) |

#### Returns

[`Query`](Query.md)

#### Defined in

[src/odsql/index.ts:88](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L88)

___

### lang

▸ **lang**(`lang`): [`Query`](Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

[`Query`](Query.md)

#### Defined in

[src/odsql/index.ts:124](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L124)

___

### limit

▸ **limit**(`limit`): [`Query`](Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `limit` | [`NumberOrUpdater`](../README.md#numberorupdater) |

#### Returns

[`Query`](Query.md)

#### Defined in

[src/odsql/index.ts:96](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L96)

___

### offset

▸ **offset**(`offset`): [`Query`](Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | [`NumberOrUpdater`](../README.md#numberorupdater) |

#### Returns

[`Query`](Query.md)

#### Defined in

[src/odsql/index.ts:104](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L104)

___

### orderBy

▸ **orderBy**(`expressions`): [`Query`](Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expressions` | [`StringOrUpdater`](../README.md#stringorupdater) |

#### Returns

[`Query`](Query.md)

#### Defined in

[src/odsql/index.ts:92](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L92)

___

### refine

▸ **refine**(`refine`): [`Query`](Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `refine` | `string` |

#### Returns

[`Query`](Query.md)

#### Defined in

[src/odsql/index.ts:116](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L116)

___

### select

▸ **select**(`expressions`): [`Query`](Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expressions` | [`StringOrUpdater`](../README.md#stringorupdater) |

#### Returns

[`Query`](Query.md)

#### Defined in

[src/odsql/index.ts:80](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L80)

___

### set

▸ **set**(`name`, `value`): [`Query`](Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `string` \| `string`[] |

#### Returns

[`Query`](Query.md)

#### Defined in

[src/odsql/index.ts:45](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L45)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/odsql/index.ts:39](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L39)

___

### unset

▸ **unset**(`name`): [`Query`](Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Query`](Query.md)

#### Defined in

[src/odsql/index.ts:51](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L51)

___

### update

▸ **update**(`name`, `value`): [`Query`](Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | [`StringOrUpdater`](../README.md#stringorupdater) |

#### Returns

[`Query`](Query.md)

#### Defined in

[src/odsql/index.ts:57](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L57)

___

### where

▸ **where**(`filters`): [`Query`](Query.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filters` | [`StringOrUpdater`](../README.md#stringorupdater) |

#### Returns

[`Query`](Query.md)

#### Defined in

[src/odsql/index.ts:84](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L84)
