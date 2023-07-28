import { PoiGeoJson as _PoiGeoJson, PoiMapOptions, PoiMapData } from '@opendatasoft/visualizations';
import { FC } from 'react';
import { Props } from './Props';
import wrap from './ReactImpl';

// Explicit name and type are needed for Storybook
const PoiGeoJson: FC<Props<PoiMapData, PoiMapOptions>> = wrap(_PoiGeoJson);
export default PoiGeoJson;
