import { KpiCard as _KpiCard, KpiCardOptions } from '@opendatasoft/visualizations';
import { FC } from 'react';
import { Props } from './Props';
import { wrap } from './ReactImpl';

// Explicit name and type are needed for storybook
const KpiCard: FC<Props<string, KpiCardOptions>> = wrap(_KpiCard);
export default KpiCard;
