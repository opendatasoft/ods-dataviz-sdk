// eslint-disable-next-line import/no-extraneous-dependencies
import { isNil } from 'lodash';
import type { Column, ColumnKey } from './types';
import { HOVER_COLUMN_KEY } from './constants';

export const getStickyClasses = ({
    column,
    scrolled,
    lastStickyColumn,
}: {
    column: Column | null;
    scrolled: boolean;
    lastStickyColumn?: ColumnKey;
}) => {
    if (!column) {
        return `sticky 
        ${HOVER_COLUMN_KEY === lastStickyColumn ? 'isLastSticky' : ''}
        ${scrolled ? 'isHorizontallyScrolled' : ''}`;
    }
    return `
    ${column.sticky ? 'sticky' : ''}
    ${column.key === lastStickyColumn ? 'isLastSticky' : ''}
    ${scrolled ? 'isHorizontallyScrolled' : ''}
  `.trim();
};

export const getStickyOffset = (offset?: number) =>
    isNil(offset) ? '' : `--sticky-offset: ${offset}px;`;
