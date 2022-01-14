import { Map as _Map, MapOptions } from '@opendatasoft/visualizations';
import { FC } from 'react';
import { Props } from './Props';
import { wrap } from './ReactImpl';

// Explicit name and type are needed for storybook
const Map: FC<Props<string, MapOptions>> = wrap(_Map);
export default Map;
