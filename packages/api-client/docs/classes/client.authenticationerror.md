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

*Inherited from [ApiError](client.apierror.md).[constructor](client.apierror.md#constructor)*

*Defined in [src/client/error.ts:5](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/error.ts#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`response` | Response |
`details` | any |

**Returns:** [AuthenticationError](client.authenticationerror.md)

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
