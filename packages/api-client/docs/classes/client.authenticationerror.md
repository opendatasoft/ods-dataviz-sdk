**[@opendatasoft/api-client](../README.md)**

> [Globals](../globals.md) / [client](../modules/client.md) / AuthenticationError

# Class: AuthenticationError

## Hierarchy

* [UserError](client.usererror.md)

  ↳ **AuthenticationError**

## Index

### Constructors

* [constructor](client.authenticationerror.md#constructor)

### Properties

* [details](client.authenticationerror.md#details)
* [message](client.authenticationerror.md#message)
* [name](client.authenticationerror.md#name)
* [response](client.authenticationerror.md#response)
* [stack](client.authenticationerror.md#stack)

## Constructors

### constructor

\+ **new AuthenticationError**(`response`: Response, `details`: any): [AuthenticationError](client.authenticationerror.md)

*Inherited from [UserError](client.usererror.md).[constructor](client.usererror.md#constructor)*

*Defined in [src/client/error.ts:5](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/client/error.ts#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`response` | Response |
`details` | any |

**Returns:** [AuthenticationError](client.authenticationerror.md)

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
