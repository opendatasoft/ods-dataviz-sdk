import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChoroplethOptions, DataFrame, TooltipParams } from '@opendatasoft/visualizations';
import { Choropleth, Props } from '../../src';
import { shapes } from './shapes';

const meta: ComponentMeta<typeof Choropleth> = {
    title: 'Map/Legend',
    component: Choropleth,
};
export default meta;

const tooltip = {
    label: (feature: TooltipParams) =>
        `Hello I'm <div style="color: red">${
            feature.label
        }</div> and my value is <div style="color: red">${feature.value || ''}</div>`,
};

const Template: ComponentStory<typeof Choropleth> = (args: Props<DataFrame, ChoroplethOptions>) => (
    <div
        style={{
            width: '180px',
            minHeight: '100px',
            minWidth: '100px',
            margin: 'auto',
            border: '1px solid black',
        }}
    >
        <Choropleth {...args} />
    </div>
);

export const ChoroplethLongLabels = Template.bind({});
const ChoroplethLongLabelsArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 600.05 },
            { x: 'Île de France', y: 350.05 },
            { x: 'Corsica', y: 950000.05 },
        ],
    },
    options: {
        shapes,
        colorsScale: {
            type: 'palette',
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#1e03fd', '#0229bf'],
        },
        aspectRatio: 1,
        legend: {
            title: 'I Am Legend',
        },
        emptyValueColor: '#cccccc',
        tooltip,
    },
};
ChoroplethLongLabels.args = ChoroplethLongLabelsArgs;
