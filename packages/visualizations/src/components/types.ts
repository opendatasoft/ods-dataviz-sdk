import type { SvelteComponentDev } from 'svelte/internal';

export interface DataType {
    data?: unknown;
    error?: unknown;
    loading?: boolean;
}

export type StylesType = string;

interface SvelteComponentConstructable {
    new (options: {
        target: Element;
        props?: Record<string, any>;
    }): SvelteComponentDev;
}

export default abstract class BaseComponent<ParametersType> {
    readonly container: HTMLElement;
    protected data: DataType;
    protected parameters: ParametersType;
    protected styles: StylesType;

    constructor(container: HTMLElement, data: DataType, parameters: ParametersType, styles: StylesType) {
        this.container = container;
        this.data = data;
        this.parameters = parameters;
        this.styles = styles;
    }

    abstract get hasData(): boolean;

    public update(newData: DataType, newParameters: ParametersType, newStyles: StylesType): void {
        this.updateData(newData);
        this.updateParameters(newParameters);
        this.updateStyles(newStyles);
    }

    public abstract updateData(newData: DataType): void;

    public abstract updateParameters(newParameters: unknown): void;

    public abstract updateStyles(newStyles: StylesType): void;

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
