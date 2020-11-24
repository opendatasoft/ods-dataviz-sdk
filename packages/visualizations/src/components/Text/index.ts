import type DataProvider from '../../dataprovider';
import type { ComponentParameters } from '../types';
import { BaseComponent } from '../types';
import TextImpl from './Text.svelte';

export interface TextParameters extends ComponentParameters {
    text: string;
}

class Text extends BaseComponent {
    constructor(protected container:any, protected dataProvider: DataProvider, private parameters: TextParameters) {
        super(container, dataProvider, parameters);

        new TextImpl({
            target: container,
            props: {
                parameters: parameters,
                dataProvider: dataProvider
            }
        });
    }

    updateParameters(newParameters: TextParameters) {}
}

export default Text;
