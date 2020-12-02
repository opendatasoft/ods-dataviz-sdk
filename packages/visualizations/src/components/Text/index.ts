import BaseComponent, { DataType, StylesType } from '../types';
import type { TextParameters } from './types'

import TextImpl from './Text.svelte';
import PlaceholderImpl from './Placeholder.svelte';

export default class Text extends BaseComponent<TextParameters> {
    hasData = !!(this.data?.data);

    constructor(container: HTMLElement, data: DataType, parameters: TextParameters, styles: StylesType) {
        super(container, data, parameters, styles);
        this.render(TextImpl, PlaceholderImpl);
    }

    public updateParameters(newParameters: TextParameters): void {
        this.parameters = newParameters;
    }

    public updateData(newData: DataType): void {
        this.data = newData;
    }

    public updateStyles(newStyles: StylesType): void {
        this.styles = newStyles;
    }
}
