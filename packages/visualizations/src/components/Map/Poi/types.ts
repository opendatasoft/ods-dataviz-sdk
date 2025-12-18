import type { Link, Async } from 'types';
import type { CategoryLegend } from 'components/Legend/types';
import type { WebGlMapData, WebGlMapOptions } from 'components/Map/WebGl/types';

export type PoiMapData = Async<WebGlMapData>;

export type PoiMapOptions = WebGlMapOptions & {
    title?: string;
    subtitle?: string;
    description?: string;
    legend?: CategoryLegend;
    /** Links menu */
    links?: Link[];
};

export type PoiMapProps = {
    data: PoiMapData;
    options: PoiMapOptions;
};
