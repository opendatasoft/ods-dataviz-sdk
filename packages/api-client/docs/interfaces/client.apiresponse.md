**[@opendatasoft/api-client](../README.md)**

> [Globals](../globals.md) / [client](../modules/client.md) / ApiResponse

# Interface: ApiResponse

## Hierarchy

* **ApiResponse**

## Index

### Properties

* [aggregations](client.apiresponse.md#aggregations)
* [dataset](client.apiresponse.md#dataset)
* [datasets](client.apiresponse.md#datasets)
* [facets](client.apiresponse.md#facets)
* [links](client.apiresponse.md#links)
* [record](client.apiresponse.md#record)
* [records](client.apiresponse.md#records)
* [total\_count](client.apiresponse.md#total_count)

## Properties

### aggregations

• `Optional` **aggregations**: any[]

*Defined in [src/client/types.ts:41](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/types.ts#L41)*

___

### dataset

• `Optional` **dataset**: [Dataset](client.dataset.md)

*Defined in [src/client/types.ts:46](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/types.ts#L46)*

___

### datasets

• `Optional` **datasets**: { dataset?: [Dataset](client.dataset.md) ; links?: [Link](client.link.md)[]  }[]

*Defined in [src/client/types.ts:43](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/types.ts#L43)*

___

### facets

• `Optional` **facets**: [Facet](client.facet.md)[]

*Defined in [src/client/types.ts:42](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/types.ts#L42)*

___

### links

• `Optional` **links**: [Link](client.link.md)[]

*Defined in [src/client/types.ts:40](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/types.ts#L40)*

___

### record

• `Optional` **record**: [OdsRecord](client.odsrecord.md)

*Defined in [src/client/types.ts:45](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/types.ts#L45)*

___

### records

• `Optional` **records**: { links?: [Link](client.link.md)[] ; record?: [OdsRecord](client.odsrecord.md)  }[]

*Defined in [src/client/types.ts:44](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/types.ts#L44)*

___

### total\_count

• `Optional` **total\_count**: undefined \| number

*Defined in [src/client/types.ts:39](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/client/types.ts#L39)*
