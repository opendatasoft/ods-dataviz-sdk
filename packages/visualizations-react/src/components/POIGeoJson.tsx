import { POIGeoJson as _POIGeoJson, POIMapOptions, DataFrame } from '@opendatasoft/visualizations';
import { FC } from 'react';
import { Props } from './Props';
import wrap from './ReactImpl';

// Explicit name and type are needed for storybook
const POIGeoJson: FC<Props<DataFrame, POIMapOptions>> = wrap(_POIGeoJson);
export default POIGeoJson;
