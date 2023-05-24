import { PoiGeoJson as _PoiGeoJson, PoiMapOptions, DataFrame } from '@opendatasoft/visualizations';
import { FC } from 'react';
import { Props } from './Props';
import wrap from './ReactImpl';

// Explicit name and type are needed for storybook
const PoiGeoJson: FC<Props<DataFrame, PoiMapOptions>> = wrap(_PoiGeoJson);
export default PoiGeoJson;
