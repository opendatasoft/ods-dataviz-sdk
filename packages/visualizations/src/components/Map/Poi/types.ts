import type { Async } from '../../../types';
import type { Source } from '../../types';
import type { WebGlMapData, WebGlMapOptions } from '../WebGl/types';
import type { CategoryLegend } from '../../Legend/types';

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
