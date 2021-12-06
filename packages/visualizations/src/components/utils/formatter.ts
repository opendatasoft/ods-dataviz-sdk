const defaultCompactNumberFormatter = new Intl.NumberFormat(undefined, {
    notation: 'compact',
});

const defaultNumberFormatter = new Intl.NumberFormat();

export function defaultNumberFormat(value: number): string {
    return defaultNumberFormatter.format(value);
}

export function defaultCompactNumberFormat(value: number): string {
    return defaultCompactNumberFormatter.format(value);
}
