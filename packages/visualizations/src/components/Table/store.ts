// eslint-disable-next-line import/no-extraneous-dependencies
import { writable, derived } from 'svelte/store';

const defaultLocale = navigator.language;

export const locale = writable<string>(defaultLocale);

const createWidths = () => {
    const { update, set, subscribe } = writable(new Map());
    return {
        updateColumn: (key: string, width: number) =>
            update(($widths) => {
                $widths.set(key, width);
                return $widths;
            }),
        reset: () => set(new Map()),
        subscribe,
    };
};
export const stickyColumnsWidth = createWidths();

export const stickyColumnsOffset = derived(stickyColumnsWidth, ($widths) => {
    const cumulativeWidths = new Map();
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
