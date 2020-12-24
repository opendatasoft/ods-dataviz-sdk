**[@opendatasoft/api-client](../README.md)**

> [Globals](../globals.md) / [client](../modules/client.md) / ServerError

# Class: ServerError

## Hierarchy

* ApiError

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

*Inherited from [UserError](client.usererror.md).[constructor](client.usererror.md#constructor)*

*Defined in [src/client/error.ts:5](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/client/error.ts#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`response` | Response |
`details` | any |

**Returns:** [ServerError](client.servererror.md)

## Properties

### details

• `Readonly` **details**: any

*Inherited from [UserError](client.usererror.md).[details](client.usererror.md#details)*

*Defined in [src/client/error.ts:4](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/client/error.ts#L4)*

___

### message

•  **message**: string

*Inherited from [UserError](client.usererror.md).[message](client.usererror.md#message)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:974*

___

### name

•  **name**: string

*Inherited from [UserError](client.usererror.md).[name](client.usererror.md#name)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:973*

___

### response

• `Readonly` **response**: Response

*Inherited from [UserError](client.usererror.md).[response](client.usererror.md#response)*

*Defined in [src/client/error.ts:5](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/client/error.ts#L5)*

___

### stack

• `Optional` **stack**: undefined \| string

*Inherited from [UserError](client.usererror.md).[stack](client.usererror.md#stack)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:975*
