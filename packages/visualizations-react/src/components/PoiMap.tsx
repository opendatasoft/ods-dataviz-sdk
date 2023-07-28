import { PoiMap as _PoiMap, PoiMapOptions, PoiMapData, Async } from '@opendatasoft/visualizations';
import { FC } from 'react';
import wrap from './ReactImpl';

// Explicit name and type are needed for Storybook
const PoiMap: FC<{ data: Async<PoiMapData>; options: PoiMapOptions }> = wrap(_PoiMap);
export default PoiMap;
