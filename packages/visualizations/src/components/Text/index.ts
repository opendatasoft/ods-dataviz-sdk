import type DataProvider from '../../dataprovider';
import type { ComponentParameters } from '../types';
import { BaseComponent } from '../types';
import TextImpl from './Text.svelte';
import PlaceholderImpl from './Placeholder.svelte';

export interface TextParameters extends ComponentParameters {
    text: string;
}

class Text extends BaseComponent {
    constructor(protected container:any, protected dataProvider: DataProvider, private parameters: TextParameters) {
        super(container, dataProvider, parameters);

        if (this.hasData(parameters)) {
            new TextImpl({
                target: container,
                props: {
                    parameters: parameters,
                    dataProvider: dataProvider
                }
            });
        } else {
            new PlaceholderImpl({ target: container });
        }
    }

    updateParameters(newParameters: TextParameters) {}

    hasData(parameters: TextParameters) {
        return !!parameters.text;
    }
}

export default Text;
