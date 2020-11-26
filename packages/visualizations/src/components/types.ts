import type DataProvider from '../dataprovider';

export interface ComponentParameters {
    // TODO: Base parameters
}

export abstract class BaseComponent {
    constructor(protected container: any, protected dataProvider: DataProvider, parameters: ComponentParameters) {}

    abstract updateParameters(newParameters: ComponentParameters): void;

    abstract hasData(parameters: ComponentParameters): void;
}
