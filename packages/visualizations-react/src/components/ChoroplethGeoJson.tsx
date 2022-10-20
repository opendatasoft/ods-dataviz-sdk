import {
    ChoroplethGeoJson as _ChoroplethGeoJson,
    ChoroplethOptions,
    DataFrame,
} from '@opendatasoft/visualizations';
import { FC } from 'react';
import { Props } from './Props';
import wrap from './ReactImpl';

// Explicit name and type are needed for storybook
const ChoroplethGeoJson: FC<Props<DataFrame, ChoroplethOptions>> = wrap(_ChoroplethGeoJson);
export default ChoroplethGeoJson;
