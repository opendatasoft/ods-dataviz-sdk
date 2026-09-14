import type { WebGlMapOptions, WebGlMapData } from 'components/Map';

export type BooleanFormatProps = {
    value: boolean;
    valueToLabel?: (v: boolean) => string;
    debugWarnings?: boolean;
};

export type DateFormatProps = {
    value: string;
    valueToLabel?: (v: string) => string;
    intl?: Intl.DateTimeFormatOptions;
    locale?: string;
    debugWarnings?: boolean;
};

export type GeoFormatProps = {
    value: WebGlMapData;
    valueToLabel?: (v: WebGlMapData) => string;
    mapOptions?: WebGlMapOptions;
    debugWarnings?: boolean;
};

export type NumberFormatProps = {
    value: number;
    valueToLabel?: (v: string) => string;
    intl?: Intl.NumberFormatOptions;
    locale?: string;
    debugWarnings?: boolean;
};

export type TextFormatProps = {
    value: string;
    valueToLabel?: (v: string) => string;
    debugWarnings?: boolean;
    /** Set to `true` to opt this column out of URL detection/linkification. Default `false`. */
    disableUrlDetection?: boolean;
};

/**
 * JSON column format props.
 * Objects are `JSON.stringify`'d in CellContent before display; `valueToLabel`
 * therefore always receives the displayed string, never the raw object.
 */
export type JsonFormatProps = {
    value: string | Record<string, unknown>;
    valueToLabel?: (v: string) => string;
    debugWarnings?: boolean;
};

export type URLFormatProps = {
    value: string;
    valueToLabel?: (v: string) => string;
    thumbnailUrl?: string;
    target?: HTMLAnchorElement['target'];
    rel?: HTMLAnchorElement['rel'];
    debugWarnings?: boolean;
    /** Set to `false` to silence the "not a url" warning, e.g. for text columns reusing URLFormat. */
    warnOnInvalidUrl?: boolean;
    /** Reject values longer than this before parsing. Unset = unbounded (default for `url`/`file`/`image`). */
    maxLength?: number;
};

export type ImageFormatProps = {
    value: string;
    valueToLabel?: (v: string) => string;
    alt?: string;
    target?: HTMLAnchorElement['target'];
    rel?: HTMLAnchorElement['rel'];
    debugWarnings?: boolean;
};
