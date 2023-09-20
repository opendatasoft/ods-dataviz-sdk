import CategoryLegendImpl from './CategoryLegend.svelte';
import SvelteSimpleImpl from '../SvelteSimpleImpl';
import type { CategoryLegendOptions } from './types';

export default class CategoryLegendComponent extends SvelteSimpleImpl<CategoryLegendOptions> {
    protected getSvelteSimpleComponentClass(): typeof CategoryLegendImpl {
        return CategoryLegendImpl;
    }
}
