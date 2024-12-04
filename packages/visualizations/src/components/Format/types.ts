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
};

export type URLFormatProps = {
    value: string;
    valueToLabel?: (v: string) => string;
    target?: HTMLAnchorElement['target'];
    rel?: HTMLAnchorElement['rel'];
    debugWarnings?: boolean;
};

export type ImageFormatProps = {
    value: unknown;
    valueToLabel?: (v: unknown) => string;
    alt?: (v: unknown) => string;
};
