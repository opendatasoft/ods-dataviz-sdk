import {
    ChoroplethVectorTiles as _ChoroplethVectorTiles,
    ChoroplethOptions,
    DataFrame,
} from '@opendatasoft/visualizations';
import { FC } from 'react';
import { Props } from './Props';
import wrap from './ReactImpl';

// Explicit name and type are needed for storybook
const ChoroplethVectorTiles: FC<Props<DataFrame, ChoroplethOptions>> = wrap(_ChoroplethVectorTiles);
export default ChoroplethVectorTiles;
