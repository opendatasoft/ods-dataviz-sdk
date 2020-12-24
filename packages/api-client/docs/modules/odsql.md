**[@opendatasoft/api-client](../README.md)**

> [Globals](../globals.md) / odsql

# Module: odsql

## Index

### Classes

* [Query](../classes/odsql.query.md)

### Type aliases

* [NumberOrUpdater](odsql.md#numberorupdater)
* [StringOrUpdater](odsql.md#stringorupdater)

### Variables

* [fromCatalog](odsql.md#fromcatalog)
* [fromDataNetwork](odsql.md#fromdatanetwork)
* [fromMonitoring](odsql.md#frommonitoring)

### Functions

* [all](odsql.md#all)
* [date](odsql.md#date)
* [dateTime](odsql.md#datetime)
* [field](odsql.md#field)
* [one](odsql.md#one)
* [root](odsql.md#root)
* [string](odsql.md#string)

## Type aliases

### NumberOrUpdater

Ƭ  **NumberOrUpdater**: number \| (current: number) => number

*Defined in [src/odsql/index.ts:5](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/odsql/index.ts#L5)*

___

### StringOrUpdater

Ƭ  **StringOrUpdater**: string \| (current: string) => string

*Defined in [src/odsql/index.ts:3](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/odsql/index.ts#L3)*

## Variables

### fromCatalog

• `Const` **fromCatalog**: (Anonymous function) = root('catalog')

*Defined in [src/odsql/index.ts:129](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/odsql/index.ts#L129)*

___

### fromDataNetwork

• `Const` **fromDataNetwork**: (Anonymous function) = root('opendatasoft')

*Defined in [src/odsql/index.ts:133](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/odsql/index.ts#L133)*

___

### fromMonitoring

• `Const` **fromMonitoring**: (Anonymous function) = root('monitoring')

*Defined in [src/odsql/index.ts:131](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/odsql/index.ts#L131)*

## Functions

### all

▸ `Const`**all**(...`conditions`: string[]): string

*Defined in [src/odsql/index.ts:143](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/odsql/index.ts#L143)*

#### Parameters:

Name | Type |
------ | ------ |
`...conditions` | string[] |

**Returns:** string

___

### date

▸ `Const`**date**(`date`: Date): string

*Defined in [src/odsql/index.ts:141](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/odsql/index.ts#L141)*

#### Parameters:

Name | Type |
------ | ------ |
`date` | Date |

**Returns:** string

___

### dateTime

▸ `Const`**dateTime**(`date`: Date): string

*Defined in [src/odsql/index.ts:139](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/odsql/index.ts#L139)*

#### Parameters:

Name | Type |
------ | ------ |
`date` | Date |

**Returns:** string

___

### field

▸ `Const`**field**(`fieldName`: string): string

*Defined in [src/odsql/index.ts:135](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/odsql/index.ts#L135)*

#### Parameters:

Name | Type |
------ | ------ |
`fieldName` | string |

**Returns:** string

___

### one

▸ `Const`**one**(...`conditions`: string[]): string

*Defined in [src/odsql/index.ts:146](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/odsql/index.ts#L146)*

#### Parameters:

Name | Type |
------ | ------ |
`...conditions` | string[] |

**Returns:** string

___

### root

▸ **root**(`source`: string): (Anonymous function)

*Defined in [src/odsql/index.ts:114](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/odsql/index.ts#L114)*

#### Parameters:

Name | Type |
------ | ------ |
`source` | string |

**Returns:** (Anonymous function)

___

### string

▸ `Const`**string**(`value`: string): string

*Defined in [src/odsql/index.ts:137](https://github.com/opendatasoft/ods-dataviz-sdk/blob/8246d9d/packages/api-client/src/odsql/index.ts#L137)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | string |

**Returns:** string
