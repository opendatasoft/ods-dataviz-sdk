import type DataProvider from '../dataprovider';

export interface ComponentProperties {
    // TODO: Base properties
}

export abstract class BaseComponent {
    constructor(protected container: any, protected dataProvider: DataProvider, properties: ComponentProperties) {}

    abstract updateProperties(newProperties: ComponentProperties): void;
}