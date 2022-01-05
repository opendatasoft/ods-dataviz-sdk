[@opendatasoft/api-client](../README.md) / [Exports](../modules.md) / ApiClient

# Class: ApiClient

## Table of contents

### Constructors

- [constructor](ApiClient.md#constructor)

### Properties

- [defaultConfig](ApiClient.md#defaultconfig)

### Methods

- [get](ApiClient.md#get)

## Constructors

### constructor

• **new ApiClient**(`options?`)

Constructs an instance of [ApiClient](ApiClient.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`ApiClientOptions`](../interfaces/ApiClientOptions.md) |

#### Defined in

[src/client/index.ts:45](https://github.com/opendatasoft/ods-dataviz-sdk/blob/b7a8d5d/packages/api-client/src/client/index.ts#L45)

## Properties

### defaultConfig

• `Readonly` **defaultConfig**: [`ApiClientConfiguration`](../interfaces/ApiClientConfiguration.md)

#### Defined in

[src/client/index.ts:40](https://github.com/opendatasoft/ods-dataviz-sdk/blob/b7a8d5d/packages/api-client/src/client/index.ts#L40)

## Methods

### get

▸ **get**<`T`\>(`query`, `options?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` \| [`Query`](Query.md) |
| `options?` | [`ApiClientOptions`](../interfaces/ApiClientOptions.md) |

#### Returns

`Promise`<`T`\>

#### Defined in

[src/client/index.ts:65](https://github.com/opendatasoft/ods-dataviz-sdk/blob/b7a8d5d/packages/api-client/src/client/index.ts#L65)
