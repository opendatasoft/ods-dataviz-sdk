import { PoiGeoJson as _PoiGeoJson, PoiMapOptions } from '@opendatasoft/visualizations';
import { FeatureCollection } from 'geojson';
import { FC } from 'react';
import { Props } from './Props';
import wrap from './ReactImpl';

// Explicit name and type are needed for Storybook
const PoiGeoJson: FC<Props<FeatureCollection, PoiMapOptions>> = wrap(_PoiGeoJson);
export default PoiGeoJson;
