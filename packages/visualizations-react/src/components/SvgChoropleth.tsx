import { FC } from 'react';
import {
    DataFrame,
    SvgChoropleth as _SvgChoropleth,
    ChoroplethOptions,
} from '@opendatasoft/visualizations';
import { Props } from './Props';
import wrap from './ReactImpl';

// Explicit name and type are needed for storybook
const SvgChoropleth: FC<Props<DataFrame, ChoroplethOptions>> = wrap(_SvgChoropleth);
export default SvgChoropleth;
