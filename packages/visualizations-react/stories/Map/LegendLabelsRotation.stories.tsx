import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
    ChoroplethGeoJsonProps,
    TooltipParams,
    ColorScaleTypes,
} from '@opendatasoft/visualizations';
import { ChoroplethGeoJson } from 'src';

import { defaultLinks } from '../utils';
import { shapes } from './data';

const meta: ComponentMeta<typeof ChoroplethGeoJson> = {
    title: 'Map/Legend',
    component: ChoroplethGeoJson,
};
export default meta;

const tooltip = {
    formatter: (feature: TooltipParams) =>
        `Hello I'm <div style="color: red">${
            feature.label
        }</div> and my value is <div style="color: red">${feature.value || ''}</div>`,
};

const Template: ComponentStory<typeof ChoroplethGeoJson> = args => (
    <div
        style={{
            width: '180px',
            minHeight: '100px',
            minWidth: '100px',
            margin: 'auto',
            border: '1px solid black',
        }}
    >
        <ChoroplethGeoJson {...args} />
    </div>
);

export const ChoroplethLongLabels = Template.bind({});
const ChoroplethLongLabelsArgs: ChoroplethGeoJsonProps = {
    data: {
        value: [
            { x: 'France', y: 600.05 },
            { x: 'Île de France', y: 350.05 },
            { x: 'Corsica', y: 950000.05 },
        ],
    },
    options: {
        shapes,
        colorScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#1e03fd', '#0229bf'],
        },
        aspectRatio: 1,
        legend: {
            title: 'I Am Legend',
        },
        emptyValueColor: '#cccccc',
        tooltip,
        links: defaultLinks,
    },
};
ChoroplethLongLabels.args = ChoroplethLongLabelsArgs;
