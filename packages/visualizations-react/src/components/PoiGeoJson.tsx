import { PoiGeoJson as _PoiGeoJson, PoiMapOptions, PoiMapData } from '@opendatasoft/visualizations';
import { FC } from 'react';
import wrap from './ReactImpl';

// Explicit name and type are needed for Storybook
const PoiGeoJson: FC<{data: PoiMapData; options: PoiMapOptions}> = wrap(_PoiGeoJson);
export default PoiGeoJson;
