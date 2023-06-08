import { field, string } from '.';

const formatFields = (fields: string[]) => {
    if (!fields || fields.length === 0) return '';
    return `${fields.map(field).join(', ')}, `;
};

/**
 * Perform full-text search on fields, either ones specified in textFields, or all fields . It's a fuzzy search that finds matches even if the searched string is not an exact match. Equivalent to [ODSQL search predicade](https://help.opendatasoft.com/apis/ods-explore-v2/explore_v2.1.html#section/ODSQL-predicates/search())
 * @param text Text to search for
 * @param textFields Fields to search in
 * @returns An ODSQL query, ready to be used as a `where` clause
 */
export const textSearch = (text: string, textFields: string[] = []) =>
    `search(${formatFields(textFields)}${string(text)})`;

/**
 * Perform full-text search on fields, either ones specified in textFields, or all fields. It matches the text fields that contain strings beginning with the searched string. Equivalent to [ODSQL startsWith predicade](https://help.opendatasoft.com/apis/ods-explore-v2/explore_v2.1.html#section/ODSQL-predicates/startswith())
 * @param text Text to search for
 * @param textFields Fields to search in
 * @returns An ODSQL query, ready to be used as a `where` clause
 */
export const textStartWith = (text: string, textFields: string[] = []) =>
    `startswith(${formatFields(textFields)}${string(text)})`;

/**
 * Perform full-text search on fields, either ones specified in textFields, or all fields. It matches the text fields that contain the searched string. Equivalent to [ODSQL suggest predicade](https://help.opendatasoft.com/apis/ods-explore-v2/explore_v2.1.html#section/ODSQL-predicates/suggest())
 * @param text Text to search for
 * @param textFields Fields to search in
 * @returns An ODSQL query, ready to be used as a `where` clause
 */
export const textSuggest = (text: string, textFields: string[] = []) =>
    `suggest(${formatFields(textFields)}${string(text)})`;

/**
 * Perform an exact query on a given field. It matches when the field contains exactly the passed value.
 * @param fieldName Field name to query for
 * @param value Value to match on
 * @returns An ODSQL query, ready to be used as a `where` clause
 */
export const exactMatch = (fieldName: string, value: string) =>
    `${field(fieldName)}=${string(value)}`;
