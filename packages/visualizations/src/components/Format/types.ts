import type { WebGlMapOptions, WebGlMapData } from 'components/Map';

export type BooleanFormatProps = {
    rawValue: boolean;
    display?: (v: boolean) => string;
};

export type DateFormatProps = {
    rawValue: string;
    display?: (v: string) => string;
    intl?: Intl.DateTimeFormatOptions;
    locale?: string;
};

export type GeoFormatProps = {
    rawValue: unknown;
    display?: (v: unknown) => string;
    mapOptions?: WebGlMapOptions;
    sources?: (v: unknown) => WebGlMapData['sources'];
    layers?: (v: unknown) => WebGlMapData['layers'];
};

export type NumberFormatProps = {
    rawValue: number;
    display?: (v: string) => string;
    intl?: Intl.NumberFormatOptions;
    locale?: string;
};

export type LongTextFormatProps = {
    rawValue: string;
    display?: (v: string) => string;
};

export type ShortTextFormatProps = {
    rawValue: string;
    display?: (v: string) => string;
};

export type URLFormatProps = {
    rawValue: string;
    display?: (v: string) => string;
    target?: HTMLAnchorElement['target'];
    rel?: HTMLAnchorElement['rel'];
};
