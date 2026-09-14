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

// maxLength is opt-in per caller: unset means unbounded, matching new URL()'s own lack of a
// length limit. Only heuristic detection on free text (short-text/long-text) should pass one —
// a column already declared as url/file/image must keep accepting arbitrarily long values
// (signed S3/CDN links routinely exceed 2048 chars).
export function isValidUrl(text: unknown, maxLength?: number): text is string {
    if (typeof text === 'string' && maxLength !== undefined && text.length > maxLength) {
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
