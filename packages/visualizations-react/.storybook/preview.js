import { _ChartJs } from '@opendatasoft/visualizations';
import isChromatic from 'chromatic/isChromatic';

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
    // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
    actions: { argTypesRegex: '^on.*' },
};

// Disable ChartJs animation for UI testing
if (isChromatic()) {
    _ChartJs.defaults.animation = false;
}
