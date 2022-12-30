import type { SvelteComponent } from 'svelte';
import { BaseFilter } from '../../types';

export default abstract class SvelteFilterImpl<Options> extends BaseFilter<Options> {
    protected abstract getSvelteComponentClass(): typeof SvelteComponent;

    private svelteComponent: SvelteComponent | undefined;

    protected onCreate() {
        const ComponentClass = this.getSvelteComponentClass();
        this.svelteComponent = new ComponentClass({
            target: this.container,
            props: {
                // filterStore: this.filterStore,
                options: this.options,
            },
        });
    }

    // protected onFilterStoreUpdated() {
    //     this.svelteComponent?.$$set?.({
    //         filterStore: this.filterStore,
    //     });
    // }

    protected onOptionsUpdated() {
        this.svelteComponent?.$$set?.({
            options: this.options,
        });
    }

    protected onDestroy() {
        this.svelteComponent?.$destroy();
        this.svelteComponent = undefined;
    }
}