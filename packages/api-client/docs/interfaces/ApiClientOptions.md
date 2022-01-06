[@opendatasoft/api-client](../README.md) / ApiClientOptions

# Interface: ApiClientOptions

## Table of contents

### Properties

- [apiKey](ApiClientOptions.md#apikey)
- [domain](ApiClientOptions.md#domain)
- [fetch](ApiClientOptions.md#fetch)
- [interceptRequest](ApiClientOptions.md#interceptrequest)
- [interceptResponse](ApiClientOptions.md#interceptresponse)

## Properties

### apiKey

• `Optional` **apiKey**: `string`

#### Defined in

[src/client/index.ts:25](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/client/index.ts#L25)

___

### domain

• `Optional` **domain**: `string`

#### Defined in

[src/client/index.ts:24](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/client/index.ts#L24)

___

### fetch

• `Optional` **fetch**: (`input`: `RequestInfo`, `init?`: `RequestInit`) => `Promise`<`Response`\>

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

[src/client/index.ts:26](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/client/index.ts#L26)

___

### interceptRequest

• `Optional` **interceptRequest**: [`RequestInterceptor`](../README.md#requestinterceptor)

#### Defined in

[src/client/index.ts:27](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/client/index.ts#L27)

___

### interceptResponse

• `Optional` **interceptResponse**: [`ResponseInterceptor`](../README.md#responseinterceptor)

#### Defined in

[src/client/index.ts:28](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/client/index.ts#L28)
