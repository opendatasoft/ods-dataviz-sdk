import type { DataFormat, ColumnOfType, FormatPropsTypeMap } from '../types';

export function isColumnOfType<K extends DataFormat>(
    column: ColumnOfType<DataFormat>,
    format: K
): column is ColumnOfType<K> {
    return column.dataFormat === format;
}

export const getOptions = <K extends DataFormat>(
    column: ColumnOfType<K>,
    record: Record<string, unknown>
): Omit<FormatPropsTypeMap[K], 'value'> | null => {
    const { options } = column;
    if (options) {
        return typeof options === 'function' ? options(record) : options;
    }
    return null;
};

export const getValue = <K extends DataFormat>(
    column: ColumnOfType<K>,
    record: Record<string, unknown>
): FormatPropsTypeMap[K]['value'] => {
    const { accessor } = column;
    return accessor ? accessor(record) : (record[column.key] as FormatPropsTypeMap[K]['value']);
};
