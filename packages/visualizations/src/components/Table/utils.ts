import type { DataFormat, Column, ColumnOfType } from './types';

export const getStickyClasses = (sticky: boolean, lastSticky: boolean, scrolled: boolean) =>
    `${sticky && 'sticky'} 
    ${lastSticky && 'isLastSticky'} 
    ${scrolled && 'isHorizontallyScrolled'}`;

export function isColumnOfType<K extends DataFormat>(
    column: Column,
    format: K
): column is ColumnOfType<K> {
    return column.dataFormat === format;
}
