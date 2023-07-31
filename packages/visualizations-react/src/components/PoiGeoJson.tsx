import {
    PoiGeoJson as _PoiGeoJson,
    PoiMapOptions,
    PoiMapData,
    Async,
} from '@opendatasoft/visualizations';
import { FC } from 'react';
import wrap from './ReactImpl';

// Explicit name and type are needed for Storybook
const PoiGeoJson: FC<{ data: Async<PoiMapData>; options: PoiMapOptions }> = wrap(_PoiGeoJson);
export default PoiGeoJson;
