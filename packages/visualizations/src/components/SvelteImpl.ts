import type { SvelteComponent } from 'svelte';
import { BaseComponent } from '../types';

export default abstract class SvelteImpl<Data, Options> extends BaseComponent<Data, Options> {
    protected abstract getSvelteComponentClass(): typeof SvelteComponent;

    private svelteComponent: SvelteComponent | undefined;

    protected onCreate() {
        const ComponentClass = this.getSvelteComponentClass();
        this.svelteComponent = new ComponentClass({
            target: this.container,
            props: {
                data: this.data,
                options: this.options,
            },
            hydrate: true,
        });
    }

    protected onDataUpdated() {
        this.svelteComponent?.$$set?.({
            data: this.data,
        });
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
