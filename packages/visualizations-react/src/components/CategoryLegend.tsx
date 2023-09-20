import { CategoryLegend as _CategoryLegend, CategoryLegendOptions } from '@opendatasoft/visualizations';
import { FC } from 'react';
import { SimpleProps } from './Props';
import wrap from './ReactSimpleImpl';

// Explicit name and type are needed for storybook
const CategoryLegend: FC<SimpleProps<CategoryLegendOptions>> = wrap(_CategoryLegend);
export default CategoryLegend;