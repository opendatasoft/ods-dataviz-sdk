import {
    DataFrame,
    SVGChoropleth as _Choropleth,
} from '@opendatasoft/visualizations';
import { Props } from './Props';
import { FC } from 'react';
import { wrap } from './ReactImpl';

// Explicit name and type are needed for storybook
const Map: FC<Props<DataFrame, any>> = wrap(_Choropleth);
export default Map;
