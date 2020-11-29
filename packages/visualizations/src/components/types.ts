import type { SvelteComponentDev } from 'svelte/internal';

export interface DataType {
    data?: unknown;
    error?: unknown;
    loading?: boolean;
}

interface SvelteComponentConstructable {
    new (options: {
        target: Element;
        props?: Record<string, any>;
    }): SvelteComponentDev;
}

export default abstract class BaseComponent<ParametersType> {
    protected container: HTMLElement;
    protected data: DataType;
    parameters: ParametersType;
    styles: CSSStyleDeclaration;

    constructor(container: HTMLElement, data: DataType, parameters: ParametersType, styles: CSSStyleDeclaration) {
        this.container = container;
        this.data = data;
        this.parameters = parameters;
        this.styles = styles;
    }

    abstract get hasData(): boolean;

    abstract updateParameters(newParameters: unknown): void;

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
