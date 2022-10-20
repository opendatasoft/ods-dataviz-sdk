import {
    ChoroplethVectorTiles as _ChoroplethVectorTiles,
    DataFrame,
    ChoroplethVectorTilesOptions,
} from '@opendatasoft/visualizations';
import { FC } from 'react';
import { Props } from './Props';
import wrap from './ReactImpl';

// Explicit name and type are needed for storybook
const ChoroplethVectorTiles: FC<Props<DataFrame, ChoroplethVectorTilesOptions>> = wrap(_ChoroplethVectorTiles);
export default ChoroplethVectorTiles;
