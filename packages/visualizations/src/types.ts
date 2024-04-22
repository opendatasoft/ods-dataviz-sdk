/* eslint-disable max-classes-per-file */
export interface Async<T> {
    value?: T;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any; // unknown is more safe, but Typescript doesn't allow catching error as unknown yet, see https://github.com/microsoft/TypeScript/issues/26174
    loading?: boolean;
}
