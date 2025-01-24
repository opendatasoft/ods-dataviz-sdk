// eslint-disable-next-line import/no-extraneous-dependencies
import { writable, derived } from 'svelte/store';
import type { HOVER_COLUMN_KEY } from './constants';

const defaultLocale = navigator.language;

export const locale = writable<string>(defaultLocale);
export const debugWarnings = writable<boolean>(false);

const newOffsetMap = () => new Map<string | typeof HOVER_COLUMN_KEY, number>();

const createWidths = () => {
    const { update, set, subscribe } = writable(newOffsetMap());
    return {
        updateColumn: (key: string | typeof HOVER_COLUMN_KEY, width: number) =>
            update(($widths) => {
                $widths.set(key, width);
                return $widths;
            }),
        reset: () => set(newOffsetMap()),
        subscribe,
    };
};
export const stickyColumnsWidth = createWidths();

export const stickyColumnsOffset = derived(stickyColumnsWidth, ($widths) => {
    const cumulativeWidths = newOffsetMap();
    let cumulativeOffset = 0;

    Array.from($widths).forEach(([key, clientWidth]) => {
        cumulativeWidths.set(key, cumulativeOffset);
        cumulativeOffset += clientWidth + 1;
    });

    return cumulativeWidths;
});

export const lastStickyColumn = derived(stickyColumnsWidth, ($widths) =>
    [...$widths.keys()].at(-1)
);

export const isHorizontallyScrolled = writable(false);
