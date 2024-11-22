// eslint-disable-next-line import/no-extraneous-dependencies
import { writable, derived } from 'svelte/store';

const defaultLocale = navigator.language;

export const locale = writable<string>(defaultLocale);

export const stickyColumnsWidth = writable<number[]>([]);
export const stickyCloumnsOffset = derived(
    stickyColumnsWidth,
    $widths => ($widths
        .reduce<number[]>((acc, _, index) => {
            acc.push(index === 0 ? 0 : acc[index - 1] + $widths[index - 1] + 1);
            return acc;
        }, [])
    )
);