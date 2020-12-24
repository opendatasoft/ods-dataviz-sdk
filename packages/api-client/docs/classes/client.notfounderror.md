**[@opendatasoft/api-client](../README.md)**

> [Globals](../globals.md) / [client](../modules/client.md) / NotFoundError

# Class: NotFoundError

## Hierarchy

* [UserError](client.usererror.md)

  ↳ **NotFoundError**

## Index

### Constructors

* [constructor](client.notfounderror.md#constructor)

### Properties

* [details](client.notfounderror.md#details)
* [message](client.notfounderror.md#message)
* [name](client.notfounderror.md#name)
* [response](client.notfounderror.md#response)
* [stack](client.notfounderror.md#stack)

## Constructors

### constructor

\+ **new NotFoundError**(`response`: Response, `details`: any): [NotFoundError](client.notfounderror.md)

*Inherited from [UserError](client.usererror.md).[constructor](client.usererror.md#constructor)*

*Defined in [src/client/error.ts:5](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/client/error.ts#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`response` | Response |
`details` | any |

**Returns:** [NotFoundError](client.notfounderror.md)

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
