import type { SvelteComponent } from 'svelte';
import { BaseFilter } from '../../types';

export default abstract class SvelteFilterImpl<Options> extends BaseFilter<Options> {
    protected abstract getSvelteComponentClass(): typeof SvelteComponent;

    private svelteComponent: SvelteComponent | undefined;
    private filterListener: (() => void) | undefined;

    protected onCreate() {
        const ComponentClass = this.getSvelteComponentClass();
        this.svelteComponent = new ComponentClass({
            target: this.container,
            props: {
                options: this.options,
            },
        });
        this.filterListener = this.svelteComponent.$on('filter', e => this.handleFilter(e.detail.value));
    }

    protected onHandleFilterUpdated() {
        // Remove previous handler
        this.filterListener?.();
        this.filterListener = this.svelteComponent?.$on('filter', e => this.handleFilter(e.detail.value));
    }

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