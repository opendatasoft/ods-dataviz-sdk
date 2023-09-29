import CategoryLegendImpl from './Legend/CategoryLegend.svelte';
import SvelteUtilsImpl from './SvelteUtilsImpl';
import type { CategoryLegendType } from './Legend/types';

export class CategoryLegend extends SvelteUtilsImpl<CategoryLegendType> {
    protected getSvelteSimpleComponentClass(): typeof CategoryLegendImpl {
        return CategoryLegendImpl;
    }
}
/**
 * Check (in the compiler) that a switch block is exhaustive.
 * Documentation: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assertUnreachable(_x: never): never {
    throw new Error("Didn't expect to get here");
}

/** Returns a random ID, suitable to be used for example as an HTML element ID. */
export function generateId() {
    return Math.random().toString(36).substring(2);
}
