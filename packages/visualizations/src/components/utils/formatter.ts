const defaultCompactNumberFormatter = new Intl.NumberFormat(undefined, {
    notation: 'compact',
});

const defaultCompactLegendNumberFormatter = new Intl.NumberFormat(undefined, {
    notation: 'compact',
    maximumSignificantDigits: 2,
});

const defaultNumberFormatter = new Intl.NumberFormat();

export function defaultNumberFormat(value: number): string {
    return defaultNumberFormatter.format(value);
}

export function defaultCompactNumberFormat(value: number): string {
    return defaultCompactNumberFormatter.format(value);
}

export function defaultCompactLegendNumberFormat(value: number): string {
    return defaultCompactLegendNumberFormatter.format(value);
}

export function assureMaxLength(value: string, maxLength: number) {
    if (value && value.length > maxLength) {
        return `${value.substring(0, maxLength)}...`;
    }
    return value;
}
