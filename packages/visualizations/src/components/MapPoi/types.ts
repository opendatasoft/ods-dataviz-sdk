import type { Async } from '../../types';
import type { Source } from '../types';
import type { MapData, MapOptions } from '../utils/Map/types';
import type { CategoryLegend } from '../Legend/types';

export type PoiMapOptions = MapOptions & {
    title?: string;
    subtitle?: string;
    description?: string;
    legend?: CategoryLegend;
    /** Link button to source */
    sourceLink?: Source;
};

export type MapPoiProps = {
    data: Async<MapData>;
    options: PoiMapOptions;
};
