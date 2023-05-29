import { field, string } from '.';

const formatFields = (fields: string[]) => {
    if (!fields || fields.length === 0) return '';
    return `${fields.map(field).join(', ')},`;
};

/**
 * Perform full-text search on fields, either ones specified in textFields, or all fields . It matches the text fields that contain the searched string. Equivaqlent to Suggest.
 * @param text Text to search for
 * @param textFields Fields to search in
 * @returns An ODSQL query, ready to be used as a `where` clause
 */
export const textSearch = (text: string, textFields: string[] = []) =>
    `search(${formatFields(textFields)}"${text}")`;

/**
 * Perform full-text search on fields, either ones specified in textFields, or all fields. It matches the text fields that contain strings beginning with the searched string.
 * @param text Text to search for
 * @param textFields Fields to search in
 * @returns An ODSQL query, ready to be used as a `where` clause
 */
export const textStartWith = (text: string, textFields: string[] = []) =>
    `startswith(${formatFields(textFields)}"${text}")`;

/**
 *  Perform full-text search on fields, either ones specified in textFields, or all fields. It matches the text fields that contain the searched string. Equivaqlent to Search.
 * @param text Text to search for
 * @param textFields Fields to search in
 * @returns An ODSQL query, ready to be used as a `where` clause
 */
export const textSuggest = (text: string, textFields: string[] = []) =>
    `suggest(${formatFields(textFields)}"${text}")`;

/**
 * Perform an exact query on a given field. It matches when the field contains exactly the passed value.
 * @param fieldName Field name to query for
 * @param value Value to match on
 * @returns An ODSQL query, ready to be used as a `where` clause
 */
export const exactMatch = (fieldName: string, value: string) =>
    `${field(fieldName)}=${string(value)}`;
