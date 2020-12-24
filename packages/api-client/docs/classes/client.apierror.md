**[@opendatasoft/api-client](../README.md)**

> [Globals](../globals.md) / [client](../modules/client.md) / ApiError

# Class: ApiError

## Hierarchy

* [Error](client.apierror.md#error)

  ↳ **ApiError**

  ↳↳ [UserError](client.usererror.md)

  ↳↳ [ServerError](client.servererror.md)

## Index

### Constructors

* [constructor](client.apierror.md#constructor)

### Properties

* [details](client.apierror.md#details)
* [message](client.apierror.md#message)
* [name](client.apierror.md#name)
* [response](client.apierror.md#response)
* [stack](client.apierror.md#stack)
* [Error](client.apierror.md#error)

## Constructors

### constructor

\+ **new ApiError**(`response`: Response, `details`: any): [ApiError](client.apierror.md)

*Defined in [src/client/error.ts:5](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/error.ts#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`response` | Response |
`details` | any |

**Returns:** [ApiError](client.apierror.md)

## Properties

### details

• `Readonly` **details**: any

*Defined in [src/client/error.ts:4](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/error.ts#L4)*

___

### message

•  **message**: string

*Inherited from [ApiError](client.apierror.md).[message](client.apierror.md#message)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:974*

___

### name

•  **name**: string

*Inherited from [ApiError](client.apierror.md).[name](client.apierror.md#name)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:973*

___

### response

• `Readonly` **response**: Response

*Defined in [src/client/error.ts:5](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/error.ts#L5)*

___

### stack

• `Optional` **stack**: undefined \| string

*Inherited from [ApiError](client.apierror.md).[stack](client.apierror.md#stack)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:975*

___

### Error

▪ `Static` **Error**: ErrorConstructor

*Defined in node_modules/typescript/lib/lib.es5.d.ts:984*
