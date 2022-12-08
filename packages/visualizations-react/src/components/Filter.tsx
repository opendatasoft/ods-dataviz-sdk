import { Filter as _Filter } from '@opendatasoft/visualizations';
import { FC } from 'react';
import { Props } from './Props';
import wrap from './ReactImpl';

// Explicit name and type are needed for storybook
const Filter: FC<Props<string, string>> = wrap(_Filter);
export default Filter;
