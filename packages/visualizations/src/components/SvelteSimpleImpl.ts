import type { SvelteComponent } from 'svelte';
import { SimpleComponent } from '../types';

export default abstract class SvelteImpl<Options> extends SimpleComponent<Options> {
    protected abstract getSvelteSimpleComponentClass(): typeof SvelteComponent;

    private svelteComponent: SvelteComponent | undefined;

    protected onCreate() {
        const ComponentClass = this.getSvelteSimpleComponentClass();
        this.svelteComponent = new ComponentClass({
            target: this.container,
            props: {
                legendOptions: this.legendOptions,
            },
        });
    }

    protected onOptionsUpdated() {
        this.svelteComponent?.$$set?.({
            legendOptions: this.legendOptions,
        });
    }

    protected onDestroy() {
        this.svelteComponent?.$destroy();
        this.svelteComponent = undefined;
    }
}