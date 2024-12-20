import type { DataFormat, Column, ColumnOfType } from '../types';

export default function isColumnOfType<K extends DataFormat>(
    column: Column,
    format: K
): column is ColumnOfType<K> {
    return column.dataFormat === format;
}
