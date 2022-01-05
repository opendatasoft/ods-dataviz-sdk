[@opendatasoft/api-client](../README.md) / [Exports](../modules.md) / AuthenticationError

# Class: AuthenticationError

## Hierarchy

- [`UserError`](UserError.md)

  ↳ **`AuthenticationError`**

## Table of contents

### Constructors

- [constructor](AuthenticationError.md#constructor)

### Properties

- [details](AuthenticationError.md#details)
- [message](AuthenticationError.md#message)
- [name](AuthenticationError.md#name)
- [response](AuthenticationError.md#response)
- [stack](AuthenticationError.md#stack)
- [stackTraceLimit](AuthenticationError.md#stacktracelimit)

### Methods

- [captureStackTrace](AuthenticationError.md#capturestacktrace)
- [prepareStackTrace](AuthenticationError.md#preparestacktrace)

## Constructors

### constructor

• **new AuthenticationError**(`response`, `details`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `Response` |
| `details` | `any` |

#### Inherited from

[UserError](UserError.md).[constructor](UserError.md#constructor)

#### Defined in

[src/client/error.ts:7](https://github.com/opendatasoft/ods-dataviz-sdk/blob/b7a8d5d/packages/api-client/src/client/error.ts#L7)

## Properties

### details

• `Readonly` **details**: `any`

#### Inherited from

[UserError](UserError.md).[details](UserError.md#details)

#### Defined in

[src/client/error.ts:4](https://github.com/opendatasoft/ods-dataviz-sdk/blob/b7a8d5d/packages/api-client/src/client/error.ts#L4)

___

### message

• **message**: `string`

#### Inherited from

[UserError](UserError.md).[message](UserError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### name

• **name**: `string`

#### Inherited from

[UserError](UserError.md).[name](UserError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### response

• `Readonly` **response**: `Response`

#### Inherited from

[UserError](UserError.md).[response](UserError.md#response)

#### Defined in

[src/client/error.ts:5](https://github.com/opendatasoft/ods-dataviz-sdk/blob/b7a8d5d/packages/api-client/src/client/error.ts#L5)

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[UserError](UserError.md).[stack](UserError.md#stack)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1024

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[UserError](UserError.md).[stackTraceLimit](UserError.md#stacktracelimit)

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

[UserError](UserError.md).[captureStackTrace](UserError.md#capturestacktrace)

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

[UserError](UserError.md).[prepareStackTrace](UserError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11
