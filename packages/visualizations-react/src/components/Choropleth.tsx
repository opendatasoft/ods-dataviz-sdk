import { Choropleth as _Choropleth, ChoroplethOptions } from '@opendatasoft/visualizations';
import { FC } from 'react';
import { Props } from './Props';
import { wrap } from './ReactImpl';

// Explicit name and type are needed for storybook
const Map: FC<Props<string, ChoroplethOptions>> = wrap(_Choropleth);
export default Map;
