import type { Async, Source } from '$lib/types';
import type { CategoryLegend } from '$lib/Legend/types';
import type { WebGlMapData, WebGlMapOptions } from '$libMap/WebGl/types';

export type PoiMapData = Async<WebGlMapData>;

export type PoiMapOptions = WebGlMapOptions & {
	title?: string;
	subtitle?: string;
	description?: string;
	legend?: CategoryLegend;
	/** Link button to source */
	sourceLink?: Source;
};

export type PoiMapProps = {
	data: PoiMapData;
	options: PoiMapOptions;
};
