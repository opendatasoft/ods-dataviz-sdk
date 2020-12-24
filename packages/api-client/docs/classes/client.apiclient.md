**[@opendatasoft/api-client](../README.md)**

> [Globals](../globals.md) / [client](../modules/client.md) / ApiClient

# Class: ApiClient

## Hierarchy

* **ApiClient**

## Index

### Constructors

* [constructor](client.apiclient.md#constructor)

### Properties

* [defaultConfig](client.apiclient.md#defaultconfig)

### Methods

* [get](client.apiclient.md#get)

## Constructors

### constructor

\+ **new ApiClient**(`options?`: [ApiClientOptions](../interfaces/client.apiclientoptions.md)): [ApiClient](client.apiclient.md)

*Defined in [src/client/index.ts:28](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/client/index.ts#L28)*

Constructs an instance of [ApiClient](client.apiclient.md)

#### Parameters:

Name | Type |
------ | ------ |
`options?` | [ApiClientOptions](../interfaces/client.apiclientoptions.md) |

**Returns:** [ApiClient](client.apiclient.md)

## Properties

### defaultConfig

• `Readonly` **defaultConfig**: [ApiClientConfiguration](../interfaces/client.apiclientconfiguration.md)

*Defined in [src/client/index.ts:28](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/client/index.ts#L28)*

## Methods

### get

▸ **get**(`query`: string \| [Query](odsql.query.md), `options?`: [ApiClientOptions](../interfaces/client.apiclientoptions.md)): Promise<[ApiResponse](../interfaces/client.apiresponse.md)\>

*Defined in [src/client/index.ts:53](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/client/index.ts#L53)*

#### Parameters:

Name | Type |
------ | ------ |
`query` | string \| [Query](odsql.query.md) |
`options?` | [ApiClientOptions](../interfaces/client.apiclientoptions.md) |

**Returns:** Promise<[ApiResponse](../interfaces/client.apiresponse.md)\>
