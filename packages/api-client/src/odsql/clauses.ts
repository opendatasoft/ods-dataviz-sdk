import { field, string } from '.';

/**
 * Perform full-text search on all fields. It matches the text fields that contain strings beginning with the searched string.
 * @param text Text to search for
 * @returns An ODSQL query, ready to be used as a `where` clause
 */
export const textSearch = (text: string) => `search("${text}")`;

/**
 * Perform an exact query on a given field. It matches when the field contains exactly the passed value.
 * @param fieldName Field name to query for
 * @param value Value to match on
 * @returns An ODSQL query, ready to be used as a `where` clause
 */
export const exactMatch = (fieldName: string, value: string) => `${field(fieldName)}=${string(value)}`