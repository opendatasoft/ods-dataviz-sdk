**[@opendatasoft/api-client](../README.md)**

> [Globals](../globals.md) / [client](../modules/client.md) / ServerError

# Class: ServerError

## Hierarchy

* [ApiError](client.apierror.md)

  ↳ **ServerError**

## Index

### Constructors

* [constructor](client.servererror.md#constructor)

### Properties

* [details](client.servererror.md#details)
* [message](client.servererror.md#message)
* [name](client.servererror.md#name)
* [response](client.servererror.md#response)
* [stack](client.servererror.md#stack)

## Constructors

### constructor

\+ **new ServerError**(`response`: Response, `details`: any): [ServerError](client.servererror.md)

*Inherited from [ApiError](client.apierror.md).[constructor](client.apierror.md#constructor)*

*Defined in [src/client/error.ts:5](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/error.ts#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`response` | Response |
`details` | any |

**Returns:** [ServerError](client.servererror.md)

## Properties

### details

• `Readonly` **details**: any

*Inherited from [ApiError](client.apierror.md).[details](client.apierror.md#details)*

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

*Inherited from [ApiError](client.apierror.md).[response](client.apierror.md#response)*

*Defined in [src/client/error.ts:5](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/error.ts#L5)*

___

### stack

• `Optional` **stack**: undefined \| string

*Inherited from [ApiError](client.apierror.md).[stack](client.apierror.md#stack)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:975*
