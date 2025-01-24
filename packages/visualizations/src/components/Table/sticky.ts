// eslint-disable-next-line import/no-extraneous-dependencies
import { get } from 'svelte/store';
import { isNil } from 'lodash';
import type { Column } from './types';
import { lastStickyColumn } from './store';
import { HOVER_COLUMN_KEY } from './constants';

export const getStickyClasses = ({
    column,
    scrolled,
}: {
    column: Column | null;
    scrolled: boolean;
}) => {
    if (!column) {
        return `sticky 
        ${HOVER_COLUMN_KEY === get(lastStickyColumn) ? 'isLastSticky' : ''}
        ${scrolled ? 'isHorizontallyScrolled' : ''}`;
    }
    return `
    ${column.sticky ? 'sticky' : ''}
    ${column.key === get(lastStickyColumn) ? 'isLastSticky' : ''}
    ${scrolled ? 'isHorizontallyScrolled' : ''}
  `.trim();
};

export const getStickyOffset = (offset?: number) =>
    isNil(offset) ? '' : `--sticky-offset: ${offset}px;`;
