export function isValidRawValue(rawValue: unknown): boolean {
    return rawValue !== undefined && rawValue !== null;
}

export function warn(value: unknown, format: string) {
    // eslint-disable-next-line no-console
    console.warn(`ODS Dataviz SDK - Table: ${value} is not a valid ${format}`);
}

export function isValidUrl(text: unknown): text is string {
    try {
        const url = new URL(text as string);
        if (['http:', 'https:', 'ftp:', 'ftps:', 'sftp:', 'mailto:'].includes(url.protocol)) {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}
