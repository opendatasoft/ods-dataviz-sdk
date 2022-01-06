@opendatasoft/api-client

# @opendatasoft/api-client

## Table of contents

### Classes

- [ApiClient](classes/ApiClient.md)
- [AuthenticationError](classes/AuthenticationError.md)
- [NotFoundError](classes/NotFoundError.md)
- [Query](classes/Query.md)
- [ServerError](classes/ServerError.md)
- [UserError](classes/UserError.md)

### Interfaces

- [ApiClientConfiguration](interfaces/ApiClientConfiguration.md)
- [ApiClientOptions](interfaces/ApiClientOptions.md)
- [ApiDataset](interfaces/ApiDataset.md)
- [ApiDatasets](interfaces/ApiDatasets.md)
- [ApiFacets](interfaces/ApiFacets.md)
- [ApiQuery](interfaces/ApiQuery.md)
- [ApiRecord](interfaces/ApiRecord.md)
- [ApiRecords](interfaces/ApiRecords.md)
- [Facet](interfaces/Facet.md)
- [Link](interfaces/Link.md)
- [OdsDataset](interfaces/OdsDataset.md)
- [OdsRecord](interfaces/OdsRecord.md)

### Type aliases

- [NumberOrUpdater](README.md#numberorupdater)
- [RequestInterceptor](README.md#requestinterceptor)
- [ResponseInterceptor](README.md#responseinterceptor)
- [StringOrUpdater](README.md#stringorupdater)

### Functions

- [all](README.md#all)
- [date](README.md#date)
- [dateTime](README.md#datetime)
- [field](README.md#field)
- [fromCatalog](README.md#fromcatalog)
- [fromDataNetwork](README.md#fromdatanetwork)
- [fromMonitoring](README.md#frommonitoring)
- [one](README.md#one)
- [string](README.md#string)

## Type aliases

### NumberOrUpdater

Ƭ **NumberOrUpdater**: `number` \| (`current`: `number`) => `number` \| ``null`` \| `undefined`

#### Defined in

[src/odsql/index.ts:5](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L5)

___

### RequestInterceptor

Ƭ **RequestInterceptor**: (`request`: `Request`) => `Promise`<`Request`\>

#### Type declaration

▸ (`request`): `Promise`<`Request`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Request` |

##### Returns

`Promise`<`Request`\>

#### Defined in

[src/client/index.ts:20](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/client/index.ts#L20)

___

### ResponseInterceptor

Ƭ **ResponseInterceptor**: (`response`: `Response`) => `Promise`<`any`\>

#### Type declaration

▸ (`response`): `Promise`<`any`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `Response` |

##### Returns

`Promise`<`any`\>

#### Defined in

[src/client/index.ts:21](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/client/index.ts#L21)

___

### StringOrUpdater

Ƭ **StringOrUpdater**: `string` \| (`current`: `string`) => `string` \| ``null`` \| `undefined`

#### Defined in

[src/odsql/index.ts:3](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L3)

## Functions

### all

▸ `Const` **all**(...`conditions`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...conditions` | (`undefined` \| ``null`` \| `string`)[] |

#### Returns

`string`

#### Defined in

[src/odsql/index.ts:161](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L161)

___

### date

▸ `Const` **date**(`date`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |

#### Returns

`string`

#### Defined in

[src/odsql/index.ts:159](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L159)

___

### dateTime

▸ `Const` **dateTime**(`date`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `date` | `Date` |

#### Returns

`string`

#### Defined in

[src/odsql/index.ts:157](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L157)

___

### field

▸ `Const` **field**(`fieldName`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fieldName` | `string` |

#### Returns

`string`

#### Defined in

[src/odsql/index.ts:153](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L153)

___

### fromCatalog

▸ `Const` **fromCatalog**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `dataset` | (`datasetId`: `string`) => { `exports`: (`format`: `string`) => [`Query`](classes/Query.md) ; `facets`: () => [`Query`](classes/Query.md) ; `itself`: () => [`Query`](classes/Query.md) ; `query`: () => [`Query`](classes/Query.md) ; `records`: () => [`Query`](classes/Query.md)  } |
| `datasets` | () => [`Query`](classes/Query.md) |
| `exports` | (`format`: `string`) => [`Query`](classes/Query.md) |
| `facets` | () => [`Query`](classes/Query.md) |
| `itself` | () => [`Query`](classes/Query.md) |
| `query` | () => [`Query`](classes/Query.md) |

#### Defined in

[src/odsql/index.ts:147](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L147)

___

### fromDataNetwork

▸ `Const` **fromDataNetwork**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `dataset` | (`datasetId`: `string`) => { `exports`: (`format`: `string`) => [`Query`](classes/Query.md) ; `facets`: () => [`Query`](classes/Query.md) ; `itself`: () => [`Query`](classes/Query.md) ; `query`: () => [`Query`](classes/Query.md) ; `records`: () => [`Query`](classes/Query.md)  } |
| `datasets` | () => [`Query`](classes/Query.md) |
| `exports` | (`format`: `string`) => [`Query`](classes/Query.md) |
| `facets` | () => [`Query`](classes/Query.md) |
| `itself` | () => [`Query`](classes/Query.md) |
| `query` | () => [`Query`](classes/Query.md) |

#### Defined in

[src/odsql/index.ts:151](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L151)

___

### fromMonitoring

▸ `Const` **fromMonitoring**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `dataset` | (`datasetId`: `string`) => { `exports`: (`format`: `string`) => [`Query`](classes/Query.md) ; `facets`: () => [`Query`](classes/Query.md) ; `itself`: () => [`Query`](classes/Query.md) ; `query`: () => [`Query`](classes/Query.md) ; `records`: () => [`Query`](classes/Query.md)  } |
| `datasets` | () => [`Query`](classes/Query.md) |
| `exports` | (`format`: `string`) => [`Query`](classes/Query.md) |
| `facets` | () => [`Query`](classes/Query.md) |
| `itself` | () => [`Query`](classes/Query.md) |
| `query` | () => [`Query`](classes/Query.md) |

#### Defined in

[src/odsql/index.ts:149](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L149)

___

### one

▸ `Const` **one**(...`conditions`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...conditions` | (`undefined` \| ``null`` \| `string`)[] |

#### Returns

`string`

#### Defined in

[src/odsql/index.ts:167](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L167)

___

### string

▸ `Const` **string**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`string`

#### Defined in

[src/odsql/index.ts:155](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/odsql/index.ts#L155)
