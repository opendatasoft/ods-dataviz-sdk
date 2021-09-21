export interface Async<T> {
    value?: T;
    error?: any; // unknown is more safe, but Typescript doesn't allow catching error as unknown yet, see https://github.com/microsoft/TypeScript/issues/26174
    loading?: boolean;
}

export abstract class BaseComponent<Data, Options> {
    readonly container: HTMLElement;

    protected data: Async<Data>;

    protected options: Options;

    constructor(container: HTMLElement, data: Async<Data>, options: Options) {
        this.container = container;
        this.data = data;
        this.options = options;
        this.onCreate();
    }

    public updateData(newData: Async<Data>): void {
        const oldData = this.data;
        this.data = newData;
        this.onDataUpdated(oldData);
    }

    public updateOptions(newOptions: Options): void {
        const oldOptions = this.options;
        this.options = newOptions;
        this.onOptionsUpdated(oldOptions);
    }

    public destroy(): void {
        this.onDestroy();
    }

    protected abstract onCreate(): void;

    protected abstract onDataUpdated(oldData: Async<Data>): void;

    protected abstract onOptionsUpdated(oldOptions: Options): void;

    protected abstract onDestroy(): void;
}
