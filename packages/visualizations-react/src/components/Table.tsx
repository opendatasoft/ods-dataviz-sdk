import { Table as _Table, TableOptions, DataFrame } from '@opendatasoft/visualizations';
import { FC } from 'react';
import { Props } from './Props';
import wrap from './ReactImpl';

// Explicit name and type are needed for storybook
const Table: FC<Props<DataFrame, TableOptions>> = wrap(_Table);
export default Table;
