export function isValidRawValue(rawValue: unknown): boolean {
    return rawValue !== undefined && rawValue !== null;
}

export function warn(value: unknown, format: string) {
    // eslint-disable-next-line no-console
    console.warn(`ODS Dataviz SDK - Table: ${value} is not a valid ${format}`);
}
