// The formatter variable will display the right number format according to a locale variable
const formatter = new Intl.NumberFormat(undefined, {
    notation: 'compact',
} as any);

// eslint-disable-next-line import/prefer-default-export
export function compactStringOrNumber(value: string | number) {
    if (typeof value === 'string') {
        return value.length > 10 ? `${value.slice(0, 10)}...` : value
    }
    return formatter.format(value).toString();
}