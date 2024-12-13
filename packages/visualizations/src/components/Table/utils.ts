// eslint-disable-next-line import/no-extraneous-dependencies
import { get } from 'svelte/store';
import type { DataFormat, Column, ColumnOfType } from './types';
import { lastStickyColumn } from './store';

export const getStickyClasses = (column: Column, scrolled: boolean) => `
    ${column.sticky && 'sticky'} 
    ${column.key === get(lastStickyColumn) && 'isLastSticky'} 
    ${scrolled && 'isHorizontallyScrolled'}
`;

export function isColumnOfType<K extends DataFormat>(
    column: Column,
    format: K
): column is ColumnOfType<K> {
    return column.dataFormat === format;
}
