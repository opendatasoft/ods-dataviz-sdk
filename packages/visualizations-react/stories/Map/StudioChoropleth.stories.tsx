import React from 'react';
import { Meta } from '@storybook/react';
import { Choropleth, Props } from '../../src';
import { ChoroplethOptions, DataFrame } from '@opendatasoft/visualizations';
import { shapes } from './shapes';

const meta: Meta = {
    title: 'Map/Choropleth',
    component: Choropleth,
};

export default meta;
const Template = (args: Props<DataFrame, ChoroplethOptions>) => (
    <div
        style={{
            width: '50%',
            minHeight: '100px',
            minWidth: '100px',
            margin: 'auto',
            border: '1px solid black',
        }}
    >
        <Choropleth {...args} />
    </div>
);

export const StudioChoropleth = Template.bind({});
const StudioChoroplethArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 60 },
            { x: 'IDF', y: 35 },
            { x: 'Corsica', y: 95 },
        ],
    },
    options: {
        style: {},
        parameters: {},
        shapes,
        aspectRatio: 1,
    },
};
StudioChoropleth.args = StudioChoroplethArgs;

export const StudioChoroplethGradient = Template.bind({});
const StudioChoroplethGradientArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 60 },
            { x: 'IDF', y: 35 },
            { x: 'Corsica', y: 95 },
        ],
    },
    options: {
        style: {},
        parameters: {},
        shapes,
        colorsScale: {
            type: 'gradient',
            colors: {
                start: '#bcf5f9',
                end: '#0229bf',
            },
        },
        aspectRatio: 1,
        legend: {
            title: 'I Am Legend',
        },
    },
};
StudioChoroplethGradient.args = StudioChoroplethGradientArgs;

export const StudioChoroplethPalette = Template.bind({});
const StudioChoroplethPaletteArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 60 },
            { x: 'IDF', y: 35 },
            { x: 'Corsica', y: 95 },
        ],
    },
    options: {
        style: {},
        parameters: {},
        shapes,
        colorsScale: {
            type: 'palette',
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
        },
        aspectRatio: 1,
        legend: {
            title: 'I Am Legend',
        },
    },
};
StudioChoroplethPalette.args = StudioChoroplethPaletteArgs;
