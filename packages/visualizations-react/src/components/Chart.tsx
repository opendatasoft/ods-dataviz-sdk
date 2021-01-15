import { Chart as _Chart, ChartOptions, DataFrame } from '@opendatasoft/visualizations';
import { FC } from 'react';
import { Props } from './Props';
import { wrap } from './ReactImpl';

// Explicit name and type are needed for storybook
const Chart: FC<Props<DataFrame, ChartOptions>> = wrap(_Chart);
export default Chart;
