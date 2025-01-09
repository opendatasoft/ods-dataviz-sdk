// eslint-disable-next-line import/no-extraneous-dependencies
import { get } from 'svelte/store';
import { isNil } from 'lodash';
import type { DataFormat, Column, ColumnOfType } from './types';
import { lastStickyColumn } from './store';

export const getStickyClasses = (column: Column, scrolled: boolean) =>
    `
  ${column.sticky ? 'sticky' : ''}
  ${column.key === get(lastStickyColumn) ? 'isLastSticky' : ''}
  ${scrolled ? 'isHorizontallyScrolled' : ''}
`.trim();

export const getStickyOffset = (offset?: number) =>
    isNil(offset) ? '' : `--sticky-offset: ${offset}px;`;

export function isColumnOfType<K extends DataFormat>(
    column: Column,
    format: K
): column is ColumnOfType<K> {
    return column.dataFormat === format;
}
