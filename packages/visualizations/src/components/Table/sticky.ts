// eslint-disable-next-line import/no-extraneous-dependencies
import { isNil } from 'lodash';
import type { Column, ColumnKey } from './types';
import { HOVER_COLUMN_KEY } from './constants';

export const getStickyClasses = ({
    column,
    scrolled,
    lastStickyColumn,
    stickyHeader = false,
    verticallyScrolled = false,
}: {
    column: Column | null;
    scrolled: boolean;
    lastStickyColumn?: ColumnKey;
    stickyHeader?: boolean;
    verticallyScrolled?: boolean;
}) => {
    const stickyHeaderClass = stickyHeader ? 'sticky-header' : '';
    const verticallyScrolledClass =
        stickyHeader && verticallyScrolled ? 'isVerticallyScrolled' : '';
    if (!column) {
        return `sticky 
        ${HOVER_COLUMN_KEY === lastStickyColumn ? 'isLastSticky' : ''}
        ${scrolled ? 'isHorizontallyScrolled' : ''}
        ${stickyHeaderClass}
        ${verticallyScrolledClass}`.trim();
    }
    return `
    ${column.sticky ? 'sticky' : ''}
    ${column.key === lastStickyColumn ? 'isLastSticky' : ''}
    ${scrolled ? 'isHorizontallyScrolled' : ''}
    ${stickyHeaderClass}
    ${verticallyScrolledClass}
  `.trim();
};

export const getStickyOffset = (offset?: number) =>
    isNil(offset) ? '' : `--sticky-offset: ${offset}px;`;
