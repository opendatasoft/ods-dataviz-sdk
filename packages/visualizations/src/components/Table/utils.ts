import { sumBy } from 'lodash';
import type { Column } from './types';

export const columnOffset = (cols: Column[], index: number) => sumBy(cols.slice(0, index), col => col.width || 0);

export const formatCell = (column: Column, record: Record<string, unknown>) => {
    if (typeof column?.format === 'function') {
        return column.format(record[column.key]);
    }
    return record[column.key];
};