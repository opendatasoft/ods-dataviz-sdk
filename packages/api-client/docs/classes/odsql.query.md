**[@opendatasoft/api-client](../README.md)**

> [Globals](../globals.md) / [odsql](../modules/odsql.md) / Query

# Class: Query

## Hierarchy

* **Query**

## Index

### Constructors

* [constructor](odsql.query.md#constructor)

### Methods

* [append](odsql.query.md#append)
* [exclude](odsql.query.md#exclude)
* [facet](odsql.query.md#facet)
* [getPath](odsql.query.md#getpath)
* [getSearchParams](odsql.query.md#getsearchparams)
* [groupBy](odsql.query.md#groupby)
* [lang](odsql.query.md#lang)
* [limit](odsql.query.md#limit)
* [offset](odsql.query.md#offset)
* [orderBy](odsql.query.md#orderby)
* [refine](odsql.query.md#refine)
* [select](odsql.query.md#select)
* [set](odsql.query.md#set)
* [toString](odsql.query.md#tostring)
* [update](odsql.query.md#update)
* [where](odsql.query.md#where)

## Constructors

### constructor

\+ **new Query**(`path?`: string, `init?`: Record<string, string \| string[]\>): [Query](odsql.query.md)

*Defined in [src/odsql/index.ts:10](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/odsql/index.ts#L10)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`path` | string | "" |
`init?` | Record<string, string \| string[]\> | - |

**Returns:** [Query](odsql.query.md)

## Methods

### append

▸ **append**(`name`: string, `value`: string): [Query](odsql.query.md)

*Defined in [src/odsql/index.ts:60](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/odsql/index.ts#L60)*

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |
`value` | string |

**Returns:** [Query](odsql.query.md)

___

### exclude

▸ **exclude**(`exclude`: string): [Query](odsql.query.md)

*Defined in [src/odsql/index.ts:105](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/odsql/index.ts#L105)*

#### Parameters:

Name | Type |
------ | ------ |
`exclude` | string |

**Returns:** [Query](odsql.query.md)

___

### facet

▸ **facet**(`facet`: string): [Query](odsql.query.md)

*Defined in [src/odsql/index.ts:97](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/odsql/index.ts#L97)*

#### Parameters:

Name | Type |
------ | ------ |
`facet` | string |

**Returns:** [Query](odsql.query.md)

___

### getPath

▸ **getPath**(): string

*Defined in [src/odsql/index.ts:17](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/odsql/index.ts#L17)*

**Returns:** string

___

### getSearchParams

▸ **getSearchParams**(): URLSearchParams

*Defined in [src/odsql/index.ts:21](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/odsql/index.ts#L21)*

**Returns:** URLSearchParams

___

### groupBy

▸ **groupBy**(`expressions`: [StringOrUpdater](../modules/odsql.md#stringorupdater)): [Query](odsql.query.md)

*Defined in [src/odsql/index.ts:79](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/odsql/index.ts#L79)*

#### Parameters:

Name | Type |
------ | ------ |
`expressions` | [StringOrUpdater](../modules/odsql.md#stringorupdater) |

**Returns:** [Query](odsql.query.md)

___

### lang

▸ **lang**(`lang`: string): [Query](odsql.query.md)

*Defined in [src/odsql/index.ts:109](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/odsql/index.ts#L109)*

#### Parameters:

Name | Type |
------ | ------ |
`lang` | string |

**Returns:** [Query](odsql.query.md)

___

### limit

▸ **limit**(`limit`: [NumberOrUpdater](../modules/odsql.md#numberorupdater)): [Query](odsql.query.md)

*Defined in [src/odsql/index.ts:87](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/odsql/index.ts#L87)*

#### Parameters:

Name | Type |
------ | ------ |
`limit` | [NumberOrUpdater](../modules/odsql.md#numberorupdater) |

**Returns:** [Query](odsql.query.md)

___

### offset

▸ **offset**(`offset`: [NumberOrUpdater](../modules/odsql.md#numberorupdater)): [Query](odsql.query.md)

*Defined in [src/odsql/index.ts:92](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/odsql/index.ts#L92)*

#### Parameters:

Name | Type |
------ | ------ |
`offset` | [NumberOrUpdater](../modules/odsql.md#numberorupdater) |

**Returns:** [Query](odsql.query.md)

___

### orderBy

▸ **orderBy**(`expressions`: [StringOrUpdater](../modules/odsql.md#stringorupdater)): [Query](odsql.query.md)

*Defined in [src/odsql/index.ts:83](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/odsql/index.ts#L83)*

#### Parameters:

Name | Type |
------ | ------ |
`expressions` | [StringOrUpdater](../modules/odsql.md#stringorupdater) |

**Returns:** [Query](odsql.query.md)

___

### refine

▸ **refine**(`refine`: string): [Query](odsql.query.md)

*Defined in [src/odsql/index.ts:101](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/odsql/index.ts#L101)*

#### Parameters:

Name | Type |
------ | ------ |
`refine` | string |

**Returns:** [Query](odsql.query.md)

___

### select

▸ **select**(`expressions`: [StringOrUpdater](../modules/odsql.md#stringorupdater)): [Query](odsql.query.md)

*Defined in [src/odsql/index.ts:71](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/odsql/index.ts#L71)*

#### Parameters:

Name | Type |
------ | ------ |
`expressions` | [StringOrUpdater](../modules/odsql.md#stringorupdater) |

**Returns:** [Query](odsql.query.md)

___

### set

▸ **set**(`name`: string, `value`: string \| string[]): [Query](odsql.query.md)

*Defined in [src/odsql/index.ts:45](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/odsql/index.ts#L45)*

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |
`value` | string \| string[] |

**Returns:** [Query](odsql.query.md)

___

### toString

▸ **toString**(): string

*Defined in [src/odsql/index.ts:39](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/odsql/index.ts#L39)*

**Returns:** string

___

### update

▸ **update**(`name`: string, `value`: [StringOrUpdater](../modules/odsql.md#stringorupdater)): [Query](odsql.query.md)

*Defined in [src/odsql/index.ts:51](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/odsql/index.ts#L51)*

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |
`value` | [StringOrUpdater](../modules/odsql.md#stringorupdater) |

**Returns:** [Query](odsql.query.md)

___

### where

▸ **where**(`filters`: [StringOrUpdater](../modules/odsql.md#stringorupdater)): [Query](odsql.query.md)

*Defined in [src/odsql/index.ts:75](https://github.com/opendatasoft/ods-dataviz-sdk/blob/ab29865/packages/api-client/src/odsql/index.ts#L75)*

#### Parameters:

Name | Type |
------ | ------ |
`filters` | [StringOrUpdater](../modules/odsql.md#stringorupdater) |

**Returns:** [Query](odsql.query.md)
