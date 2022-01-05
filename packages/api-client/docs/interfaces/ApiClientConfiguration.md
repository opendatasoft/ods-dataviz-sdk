[@opendatasoft/api-client](../README.md) / [Exports](../modules.md) / ApiClientConfiguration

# Interface: ApiClientConfiguration

## Table of contents

### Properties

- [apiKey](ApiClientConfiguration.md#apikey)
- [baseUrl](ApiClientConfiguration.md#baseurl)
- [fetch](ApiClientConfiguration.md#fetch)
- [interceptRequest](ApiClientConfiguration.md#interceptrequest)
- [interceptResponse](ApiClientConfiguration.md#interceptresponse)

## Properties

### apiKey

• `Optional` **apiKey**: `string`

#### Defined in

[src/client/index.ts:33](https://github.com/opendatasoft/ods-dataviz-sdk/blob/b7a8d5d/packages/api-client/src/client/index.ts#L33)

___

### baseUrl

• **baseUrl**: `string`

#### Defined in

[src/client/index.ts:32](https://github.com/opendatasoft/ods-dataviz-sdk/blob/b7a8d5d/packages/api-client/src/client/index.ts#L32)

___

### fetch

• **fetch**: (`input`: `RequestInfo`, `init?`: `RequestInit`) => `Promise`<`Response`\>

#### Type declaration

▸ (`input`, `init?`): `Promise`<`Response`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `RequestInfo` |
| `init?` | `RequestInit` |

##### Returns

`Promise`<`Response`\>

#### Defined in

[src/client/index.ts:34](https://github.com/opendatasoft/ods-dataviz-sdk/blob/b7a8d5d/packages/api-client/src/client/index.ts#L34)

___

### interceptRequest

• `Optional` **interceptRequest**: [`RequestInterceptor`](../modules.md#requestinterceptor)

#### Defined in

[src/client/index.ts:35](https://github.com/opendatasoft/ods-dataviz-sdk/blob/b7a8d5d/packages/api-client/src/client/index.ts#L35)

___

### interceptResponse

• `Optional` **interceptResponse**: [`ResponseInterceptor`](../modules.md#responseinterceptor)

#### Defined in

[src/client/index.ts:36](https://github.com/opendatasoft/ods-dataviz-sdk/blob/b7a8d5d/packages/api-client/src/client/index.ts#L36)
