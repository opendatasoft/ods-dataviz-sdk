import BaseComponent, { DataType } from '../types';
import type { TextParameters } from './types'

import TextImpl from './Text.svelte';
import PlaceholderImpl from './Placeholder.svelte';

export default class Text extends BaseComponent<TextParameters> {
    hasData = !!(this.data?.data);

    constructor(container: HTMLElement, data: DataType, parameters: TextParameters, styles: CSSStyleDeclaration) {
        super(container, data, parameters, styles);
        this.render(TextImpl, PlaceholderImpl);
    }

    updateParameters(newParameters: TextParameters): void {
        this.parameters = newParameters;
    }
}
