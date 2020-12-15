import type { SvelteComponentDev } from 'svelte/internal';

export interface Data {
    data?: unknown;
    error?: unknown;
    loading?: boolean;
}

export type Styles = string;

interface SvelteComponentConstructable {
    new (options: {
        target: Element;
        props?: Record<string, any>;
    }): SvelteComponentDev;
}

export default abstract class BaseComponent<Parameters> {
    readonly container: HTMLElement;
    protected data: Data;
    protected parameters: Parameters;
    protected styles: Styles;

    constructor(container: HTMLElement, data: Data, parameters: Parameters, styles: Styles) {
        this.container = container;
        this.data = data;
        this.parameters = parameters;
        this.styles = styles;
    }

    abstract get hasData(): boolean;

    public update(newData: Data, newParameters: Parameters, newStyles: Styles): void {
        this.updateData(newData);
        this.updateParameters(newParameters);
        this.updateStyles(newStyles);
    }

    public abstract updateData(newData: Data): void;

    public abstract updateParameters(newParameters: unknown): void;

    public abstract updateStyles(newStyles: Styles): void;

    render(Component: SvelteComponentConstructable, Placeholder: SvelteComponentConstructable): void {
        if (this.hasData) {
            new Component({
                target: this.container,
                props: {
                    data: this.data.data,
                    parameters: this.parameters,
                    styles: this.styles,
                }
            });
        } else {
            new Placeholder({
                target: this.container,
                props: {
                    loading: this.data?.loading,
                    error: this.data?.error,
                }
            });
        }
    }
}
