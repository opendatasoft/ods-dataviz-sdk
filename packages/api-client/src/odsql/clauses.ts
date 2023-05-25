import { field, string } from '.';

const formatFields = (fields: string[]) => {
    if (!fields || fields.length === 0) return '';
    return `${fields.map(field).join(', ')},`;
};

/**
 * Perform full-text search on all fields. It matches the text fields that contain strings beginning with the searched string.
 * @param text_fields Fields to search in
 * @param text Text to search for
 * @returns An ODSQL query, ready to be used as a `where` clause
 */
export const textSearch = (text: string, text_fields: string[] = []) => `search(${formatFields(text_fields)}"${text}")`;

/**
 * Perform full-text search on all fields. It matches the text fields that contain strings beginning with the searched string.
 * @param text_fields Fields to search in
 * @param text Text to search for
 * @returns An ODSQL query, ready to be used as a `where` clause
 */
export const textStartWith = (text: string, text_fields: string[] = []) => `startswith(${formatFields(text_fields)}"${text}")`;

/**
 * Perform full-text search on all fields. It matches the text fields that contain strings beginning with the searched string.
 * @param text_fields Fields to search in
 * @param text Text to search for
 * @returns An ODSQL query, ready to be used as a `where` clause
 */
export const textSuggest = (text: string, text_fields: string[] = []) => `suggest(${formatFields(text_fields)}"${text}")`;

/**
 * Perform an exact query on a given field. It matches when the field contains exactly the passed value.
 * @param fieldName Field name to query for
 * @param value Value to match on
 * @returns An ODSQL query, ready to be used as a `where` clause
 */
export const exactMatch = (fieldName: string, value: string) =>
    `${field(fieldName)}=${string(value)}`;
