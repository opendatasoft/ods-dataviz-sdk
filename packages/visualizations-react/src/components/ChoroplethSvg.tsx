import { FC } from 'react';
import {
    DataFrame,
    ChoroplethSvg as _ChoroplethSvg,
    ChoroplethOptions,
} from '@opendatasoft/visualizations';
import { Props } from './Props';
import wrap from './ReactImpl';

// Explicit name and type are needed for storybook
const ChoroplethSvg: FC<Props<DataFrame, ChoroplethOptions>> = wrap(_ChoroplethSvg);
export default ChoroplethSvg;
