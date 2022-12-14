import { FC, ForwardedRef } from 'react';
import {
    DataFrame,
    NavigableMap as _NavigableMap,
    NavigableChoroplethOptions,
} from '@opendatasoft/visualizations';
import { Props } from './Props';
import wrap from './ReactImpl';

// Explicit name and type are needed for storybook
const NavigableMap: FC<Props<DataFrame, NavigableChoroplethOptions>> =
    wrap(_NavigableMap);
export default NavigableMap;
