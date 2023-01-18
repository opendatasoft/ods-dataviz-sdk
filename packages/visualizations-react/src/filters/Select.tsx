import { Select as _Select, SelectOptions } from '@opendatasoft/visualizations';
import { FC } from 'react';
import { FilterProps } from './Props';
import wrap from './ReactFilterImpl';

// Explicit name and type are needed for storybook
const SelectFilter: FC<FilterProps<SelectOptions>> = wrap(_Select);
export default SelectFilter;
