import type { WebGlMapOptions, WebGlMapData } from '$lib/Map';

export type BooleanFormatProps = {
	rawValue: unknown;
	display?: (v: boolean) => string;
};

export type DateFormatProps = {
	rawValue: unknown;
	display?: (v: string) => string;
	intl?: Intl.DateTimeFormatOptions;
	locale?: string;
};

export type GeoFormatProps = {
	rawValue: unknown;
	display?: (v: unknown) => unknown;
	mapOptions?: WebGlMapOptions;
	sources?: (v: unknown) => WebGlMapData['sources'];
	layers?: (v: unknown) => WebGlMapData['layers'];
};

export type NumberFormatProps = {
	rawValue: unknown;
	display?: (v: string) => string;
	intl?: Intl.NumberFormatOptions;
	locale?: string;
};

export type LongTextFormatProps = {
	rawValue: unknown;
	display?: (v: string) => string;
};

export type ShortTextFormatProps = {
	rawValue: unknown;
	display?: (v: string) => string;
};

export type URLFormatProps = {
	rawValue: unknown;
	display?: (v: string) => string;
	target?: HTMLAnchorElement['target'];
	rel?: HTMLAnchorElement['rel'];
};
