// eslint-disable-next-line import/prefer-default-export
export const DATA_FORMAT = {
    longText: 'long-text',
    shortText: 'short-text',
    date: 'date',
    number: 'number',
    boolean: 'boolean',
    url: 'url',
    geo: 'geo',
    json: 'json',
    file: 'file',
    image: 'image',
    ipAddress: 'ip-address',
    id: 'id',
} as const;

export const HOVER_COLUMN_KEY = Symbol('hover column');
