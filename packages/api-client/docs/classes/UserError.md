[@opendatasoft/api-client](../README.md) / UserError

# Class: UserError

## Hierarchy

- `ApiError`

  ↳ **`UserError`**

  ↳↳ [`AuthenticationError`](AuthenticationError.md)

  ↳↳ [`NotFoundError`](NotFoundError.md)

## Table of contents

### Constructors

- [constructor](UserError.md#constructor)

### Properties

- [details](UserError.md#details)
- [message](UserError.md#message)
- [name](UserError.md#name)
- [response](UserError.md#response)
- [stack](UserError.md#stack)
- [stackTraceLimit](UserError.md#stacktracelimit)

### Methods

- [captureStackTrace](UserError.md#capturestacktrace)
- [prepareStackTrace](UserError.md#preparestacktrace)

## Constructors

### constructor

• **new UserError**(`response`, `details`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `Response` |
| `details` | `any` |

#### Inherited from

ApiError.constructor

#### Defined in

[src/client/error.ts:7](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/client/error.ts#L7)

## Properties

### details

• `Readonly` **details**: `any`

#### Inherited from

ApiError.details

#### Defined in

[src/client/error.ts:4](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/client/error.ts#L4)

___

### message

• **message**: `string`

#### Inherited from

ApiError.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### name

• **name**: `string`

#### Inherited from

ApiError.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### response

• `Readonly` **response**: `Response`

#### Inherited from

ApiError.response

#### Defined in

[src/client/error.ts:5](https://github.com/opendatasoft/ods-dataviz-sdk/blob/de901ba/packages/api-client/src/client/error.ts#L5)

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

ApiError.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1024

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

ApiError.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

ApiError.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4

___

### prepareStackTrace

▸ `Static` `Optional` **prepareStackTrace**(`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://github.com/v8/v8/wiki/Stack%20Trace%20API#customizing-stack-traces

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

#### Returns

`any`

#### Inherited from

ApiError.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11
