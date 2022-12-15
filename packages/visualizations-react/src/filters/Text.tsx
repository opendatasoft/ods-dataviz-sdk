import { Text as _Text } from '@opendatasoft/visualizations';
import { FC } from 'react';
import { FilterProps } from './Props';
import wrap from './ReactFilterImpl';

// Explicit name and type are needed for storybook
const TextFilter: FC<FilterProps<{}>> = wrap(_Text);
export default TextFilter;
