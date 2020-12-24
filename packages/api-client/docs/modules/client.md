**[@opendatasoft/api-client](../README.md)**

> [Globals](../globals.md) / client

# Module: client

## Index

### Classes

* [ApiClient](../classes/client.apiclient.md)
* [AuthenticationError](../classes/client.authenticationerror.md)
* [NotFoundError](../classes/client.notfounderror.md)
* [ServerError](../classes/client.servererror.md)
* [UserError](../classes/client.usererror.md)

### Interfaces

* [ApiClientConfiguration](../interfaces/client.apiclientconfiguration.md)
* [ApiClientOptions](../interfaces/client.apiclientoptions.md)
* [ApiResponse](../interfaces/client.apiresponse.md)
* [Dataset](../interfaces/client.dataset.md)
* [Facet](../interfaces/client.facet.md)
* [Link](../interfaces/client.link.md)
* [OdsRecord](../interfaces/client.odsrecord.md)

### Type aliases

* [RequestInterceptor](client.md#requestinterceptor)
* [ResponseInterceptor](client.md#responseinterceptor)

## Type aliases

### RequestInterceptor

Ƭ  **RequestInterceptor**: (request: Request) => Promise<Request\>

*Defined in [src/client/index.ts:8](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/client/index.ts#L8)*

___

### ResponseInterceptor

Ƭ  **ResponseInterceptor**: (response: Response) => Promise<[ApiResponse](../interfaces/client.apiresponse.md)\>

*Defined in [src/client/index.ts:9](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/client/index.ts#L9)*
