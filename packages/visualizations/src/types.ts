export interface Async<T> {
    value?: T;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export abstract class BaseFilter<Options> {
    readonly container: HTMLElement;

    // protected filterStore: FilterStore;

    protected options: Options;

    constructor(container: HTMLElement, options: Options) {
        this.container = container;
        // this.filterStore = filterStore;
        this.options = options;
        this.onCreate();
    }

    // public updateFilterStore(newFilterStore: FilterStore): void {
    //     const oldFilterStore = this.filterStore;
    //     this.filterStore = newFilterStore;
    //     // FIXME: Why old? (copied from BaseComponent)
    //     this.onFilterStoreUpdated(oldFilterStore);
    // }

    public updateOptions(newOptions: Options): void {
        const oldOptions = this.options;
        this.options = newOptions;
        this.onOptionsUpdated(oldOptions);
    }

    public destroy(): void {
        this.onDestroy();
    }

    protected abstract onCreate(): void;

    // protected abstract onFilterStoreUpdated(oldData: FilterStore): void;

    protected abstract onOptionsUpdated(oldOptions: Options): void;

    protected abstract onDestroy(): void;
}
