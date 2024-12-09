import type { WebGlMapOptions, WebGlMapData } from 'components/Map';

export type BooleanFormatProps = {
    value: boolean;
    valueToLabel?: (v: boolean) => string;
};

export type DateFormatProps = {
    value: string;
    valueToLabel?: (v: string) => string;
    intl?: Intl.DateTimeFormatOptions;
    locale?: string;
};

export type GeoFormatProps = {
    value: WebGlMapData;
    valueToLabel?: (v: WebGlMapData) => string;
    mapOptions?: WebGlMapOptions;
};

export type NumberFormatProps = {
    value: number;
    valueToLabel?: (v: string) => string;
    intl?: Intl.NumberFormatOptions;
    locale?: string;
};

export type TextFormatProps = {
    value: string;
    valueToLabel?: (v: string) => string;
};

export type URLFormatProps = {
    value: string;
    valueToLabel?: (v: string) => string;
    target?: HTMLAnchorElement['target'];
    rel?: HTMLAnchorElement['rel'];
};
