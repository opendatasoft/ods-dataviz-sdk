import CategoryLegendImpl from './CategoryLegend.svelte';
import SvelteSimpleImpl from '../SvelteSimpleImpl';
import type { CategoryLegendType } from './types';

export default class CategoryLegendComponent extends SvelteSimpleImpl<CategoryLegendType> {
    protected getSvelteSimpleComponentClass(): typeof CategoryLegendImpl {
        return CategoryLegendImpl;
    }
}