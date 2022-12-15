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

export type HandleFilterCallback = (newFilter: string | null) => void;

export abstract class BaseFilter<Options> {
    readonly container: HTMLElement;

    protected handleFilter: HandleFilterCallback;

    protected options: Options;

    constructor(container: HTMLElement, handleFilter: HandleFilterCallback, options: Options) {
        this.container = container;
        this.handleFilter = handleFilter;
        this.options = options;
        this.onCreate();
    }

    public updateHandleFilter(newHandleFilter: HandleFilterCallback): void {
        const oldHandleFilter = this.handleFilter;
        this.handleFilter = newHandleFilter;
        // FIXME: Why old? (copied from BaseComponent)
        this.onHandleFilterUpdated(oldHandleFilter);
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

    protected abstract onHandleFilterUpdated(oldHandleFilter: HandleFilterCallback): void;

    protected abstract onOptionsUpdated(oldOptions: Options): void;

    protected abstract onDestroy(): void;
}
