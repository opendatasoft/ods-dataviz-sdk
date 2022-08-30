import { DataFrame, SvgChoropleth as _SvgChoropleth } from '@opendatasoft/visualizations';
import { Props } from './Props';
import { FC } from 'react';
import { wrap } from './ReactImpl';

// Explicit name and type are needed for storybook
const SvgChoropleth: FC<Props<DataFrame, any>> = wrap(_SvgChoropleth);
export default SvgChoropleth;
