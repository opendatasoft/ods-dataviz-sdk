**[@opendatasoft/api-client](../README.md)**

> [Globals](../globals.md) / client

# Module: client

## Index

### Classes

* [ApiClient](../classes/client.apiclient.md)
* [ApiError](../classes/client.apierror.md)
* [AuthenticationError](../classes/client.authenticationerror.md)
* [NotFoundError](../classes/client.notfounderror.md)
* [ServerError](../classes/client.servererror.md)
* [UserError](../classes/client.usererror.md)

### Interfaces

* [ApiClientConfiguration](../interfaces/client.apiclientconfiguration.md)
* [ApiClientOptions](../interfaces/client.apiclientoptions.md)
* [ApiResponse](../interfaces/client.apiresponse.md)
* [Dataset](../interfaces/client.dataset.md)
* [Facet](../interfaces/client.facet.md)
* [Link](../interfaces/client.link.md)
* [OdsRecord](../interfaces/client.odsrecord.md)

### Type aliases

* [RequestInterceptor](client.md#requestinterceptor)
* [ResponseInterceptor](client.md#responseinterceptor)

### Variables

* [API\_KEY\_AUTH\_TYPE](client.md#api_key_auth_type)

### Functions

* [buildConfig](client.md#buildconfig)
* [computeBaseUrl](client.md#computebaseurl)

## Type aliases

### RequestInterceptor

Ƭ  **RequestInterceptor**: (request: Request) => Promise<Request\>

*Defined in [src/client/index.ts:8](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/index.ts#L8)*

___

### ResponseInterceptor

Ƭ  **ResponseInterceptor**: (response: Response) => Promise<[ApiResponse](../interfaces/client.apiresponse.md)\>

*Defined in [src/client/index.ts:9](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/index.ts#L9)*

## Variables

### API\_KEY\_AUTH\_TYPE

• `Const` **API\_KEY\_AUTH\_TYPE**: \"ApiKey\" = "ApiKey"

*Defined in [src/client/index.ts:6](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/index.ts#L6)*

## Functions

### buildConfig

▸ **buildConfig**(`apiClientOptions`: [ApiClientOptions](../interfaces/client.apiclientoptions.md) \| undefined, `defaultConfig`: [ApiClientConfiguration](../interfaces/client.apiclientconfiguration.md)): [ApiClientConfiguration](../interfaces/client.apiclientconfiguration.md)

*Defined in [src/client/index.ts:113](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/index.ts#L113)*

#### Parameters:

Name | Type |
------ | ------ |
`apiClientOptions` | [ApiClientOptions](../interfaces/client.apiclientoptions.md) \| undefined |
`defaultConfig` | [ApiClientConfiguration](../interfaces/client.apiclientconfiguration.md) |

**Returns:** [ApiClientConfiguration](../interfaces/client.apiclientconfiguration.md)

___

### computeBaseUrl

▸ **computeBaseUrl**(`domain`: string): string

*Defined in [src/client/index.ts:134](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/index.ts#L134)*

#### Parameters:

Name | Type |
------ | ------ |
`domain` | string |

**Returns:** string
