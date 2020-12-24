**[@opendatasoft/api-client](../README.md)**

> [Globals](../globals.md) / [client](../modules/client.md) / UserError

# Class: UserError

## Hierarchy

* [ApiError](client.apierror.md)

  ↳ **UserError**

  ↳↳ [AuthenticationError](client.authenticationerror.md)

  ↳↳ [NotFoundError](client.notfounderror.md)

## Index

### Constructors

* [constructor](client.usererror.md#constructor)

### Properties

* [details](client.usererror.md#details)
* [message](client.usererror.md#message)
* [name](client.usererror.md#name)
* [response](client.usererror.md#response)
* [stack](client.usererror.md#stack)

## Constructors

### constructor

\+ **new UserError**(`response`: Response, `details`: any): [UserError](client.usererror.md)

*Inherited from [ApiError](client.apierror.md).[constructor](client.apierror.md#constructor)*

*Defined in [src/client/error.ts:5](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/error.ts#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`response` | Response |
`details` | any |

**Returns:** [UserError](client.usererror.md)

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
