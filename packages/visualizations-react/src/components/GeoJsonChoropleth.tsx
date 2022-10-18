import {
    GeoJsonChoropleth as _GeoJsonChoropleth,
    ChoroplethOptions,
    DataFrame,
} from '@opendatasoft/visualizations';
import { FC } from 'react';
import { Props } from './Props';
import wrap from './ReactImpl';

// Explicit name and type are needed for storybook
const GeoJsonChoropleth: FC<Props<DataFrame, ChoroplethOptions>> = wrap(_GeoJsonChoropleth);
export default GeoJsonChoropleth;
