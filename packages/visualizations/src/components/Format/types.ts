import type { WebGlMapOptions, WebGlMapData } from 'components/Map';

export type BooleanFormatProps = {
    rawValue: unknown;
    display?: (v: unknown) => string;
    accessor?: (v: unknown) => boolean;
};

export type DateFormatProps = {
    rawValue: unknown;
    display?: (v: unknown) => string;
    accessor?: (v: unknown) => string;
    intl?: Intl.DateTimeFormatOptions;
    locale?: string;
};

export type GeoFormatProps = {
    rawValue: unknown;
    display?: (v: unknown) => unknown;
    accessor?: (v: unknown) => WebGlMapData;
    mapOptions?: WebGlMapOptions;
    sources?: (v: unknown) => WebGlMapData['sources'];
    layers?: (v: unknown) => WebGlMapData['layers'];
};

export type NumberFormatProps = {
    rawValue: unknown;
    display?: (v: unknown) => string;
    accessor?: (v: unknown) => number;
    intl?: Intl.NumberFormatOptions;
    locale?: string;
};

export type LongTextFormatProps = {
    rawValue: unknown;
    display?: (v: unknown) => string;
    accessor?: (v: unknown) => string;
};

export type ShortTextFormatProps = {
    rawValue: unknown;
    display?: (v: string) => string;
    accessor?: (v: unknown) => string;
};

export type URLFormatProps = {
    rawValue: unknown;
    display?: (v: unknown) => string;
    accessor?: (v: unknown) => string;
    target?: HTMLAnchorElement['target'];
    rel?: HTMLAnchorElement['rel'];
};
