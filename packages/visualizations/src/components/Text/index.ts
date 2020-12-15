import BaseComponent, { Data, Styles } from '../types';
import type { TextParameters } from './types'

import TextImpl from './Text.svelte';
import PlaceholderImpl from './Placeholder.svelte';

export default class Text extends BaseComponent<TextParameters> {
    isDisplayable = !!(this.data?.data);

    constructor(container: HTMLElement, data: Data, parameters: TextParameters, styles: Styles) {
        super(container, data, parameters, styles);
        this.render(TextImpl, PlaceholderImpl);
    }

    public updateParameters(newParameters: TextParameters): void {
        this.parameters = newParameters;
    }

    public updateData(newData: Data): void {
        this.data = newData;
    }

    public updateStyles(newStyles: Styles): void {
        this.styles = newStyles;
    }
}
