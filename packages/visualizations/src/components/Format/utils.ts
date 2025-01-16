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
