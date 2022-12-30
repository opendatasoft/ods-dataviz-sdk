import { Text as _Text } from '@opendatasoft/visualizations';
import { FC } from 'react';
import { Props } from '../components/Props';
import wrap from '../components/ReactImpl';

// Explicit name and type are needed for storybook
const TextFilter: FC<Props<null, any>> = wrap(_Text);
export default TextFilter;
