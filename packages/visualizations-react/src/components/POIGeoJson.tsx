import {
    POIGeoJson as _POIGeoJson,
    POIMapOptionsB,
    DataFrame,
} from '@opendatasoft/visualizations';
import { FC } from 'react';
import { Props } from './Props';
import wrap from './ReactImpl';

// Explicit name and type are needed for storybook
const POIGeoJson: FC<Props<DataFrame, POIMapOptionsB>> = wrap(_POIGeoJson);
export default POIGeoJson;
