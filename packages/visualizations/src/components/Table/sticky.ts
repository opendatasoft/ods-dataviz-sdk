// eslint-disable-next-line import/no-extraneous-dependencies
import { isNil } from 'lodash';
import type { ColumnKey } from './types';

export const getStickyClasses = ({
    columnKey,
    sticky,
    scrolled,
    lastStickyColumn,
}: {
    columnKey: ColumnKey;
    sticky: boolean;
    scrolled: boolean;
    lastStickyColumn?: ColumnKey;
}) =>
    `
    ${sticky ? 'sticky' : ''}
    ${columnKey === lastStickyColumn ? 'isLastSticky' : ''}
    ${scrolled ? 'isHorizontallyScrolled' : ''}
`.trim();

export const getStickyOffset = (offset?: number) =>
    isNil(offset) ? '' : `--sticky-offset: ${offset}px;`;
