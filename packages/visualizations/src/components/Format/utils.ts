export function isValidValue(value: unknown): boolean {
    return value !== undefined && value !== null;
}

export function warn(value: unknown, format: string, debugWarnings = false) {
    if (!debugWarnings) {
        return;
    }

    switch (format) {
        case 'url':
            // eslint-disable-next-line no-console
            console.warn(
                `ODS Dataviz SDK - Table: no url detected in ${value}. Formatting as string.`
            );
            break;
        default:
            // eslint-disable-next-line no-console
            console.warn(`ODS Dataviz SDK - Table: ${value} is not a valid ${format}`);
    }
}

// Legacy (IE-era) URL length convention; skip new URL() (cost grows with input size) past this size.
export const MAX_URL_LENGTH = 2048;

export function isValidUrl(text: unknown): text is string {
    if (typeof text === 'string' && text.length > MAX_URL_LENGTH) {
        return false;
    }

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
