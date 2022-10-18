import {
    VectorTilesChoropleth as _VectorTilesChoropleth,
    ChoroplethOptions,
    DataFrame,
} from '@opendatasoft/visualizations';
import { FC } from 'react';
import { Props } from './Props';
import wrap from './ReactImpl';

// Explicit name and type are needed for storybook
const VectorTilesChoropleth: FC<Props<DataFrame, ChoroplethOptions>> = wrap(_VectorTilesChoropleth);
export default VectorTilesChoropleth;
