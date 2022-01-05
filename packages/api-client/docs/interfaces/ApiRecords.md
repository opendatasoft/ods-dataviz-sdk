[@opendatasoft/api-client](../README.md) / [Exports](../modules.md) / ApiRecords

# Interface: ApiRecords<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [links](ApiRecords.md#links)
- [records](ApiRecords.md#records)
- [total\_count](ApiRecords.md#total_count)

## Properties

### links

• **links**: [`Link`](Link.md)[]

#### Defined in

[src/client/types.ts:40](https://github.com/opendatasoft/ods-dataviz-sdk/blob/b7a8d5d/packages/api-client/src/client/types.ts#L40)

___

### records

• **records**: { `links`: [`Link`](Link.md)[] ; `record`: [`OdsRecord`](OdsRecord.md)<`T`\>  }[]

#### Defined in

[src/client/types.ts:41](https://github.com/opendatasoft/ods-dataviz-sdk/blob/b7a8d5d/packages/api-client/src/client/types.ts#L41)

___

### total\_count

• `Optional` **total\_count**: `number`

#### Defined in

[src/client/types.ts:39](https://github.com/opendatasoft/ods-dataviz-sdk/blob/b7a8d5d/packages/api-client/src/client/types.ts#L39)
