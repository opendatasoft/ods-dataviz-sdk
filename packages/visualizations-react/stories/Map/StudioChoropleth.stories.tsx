import React from 'react';
import { Meta } from '@storybook/react';
import { Choropleth, Props } from '../../src';
import { ChoroplethOptions, DataFrame } from '@opendatasoft/visualizations';
import { shapes } from './shapes';
import { IMAGES } from '../utils';

const meta: Meta = {
    title: 'Map/Choropleth',
    component: Choropleth,
};

const df = [
    { x: 'France', y: 60 },
    { x: 'Île de France', y: 35 },
    { x: 'Corsica', y: 95 },
];

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
            { x: 'Île de France', y: 35 },
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

export const StudioChoroplethEmptyValue = Template.bind({});
const StudioChoroplethEmptyValueArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 60 },
            { x: 'Corsica', y: 95 },
        ],
    },
    options: {
        style: {},
        parameters: {},
        shapes,
        defaultEmptyValueColor: '#f29d9d',
        aspectRatio: 1,
    },
};
StudioChoroplethEmptyValue.args = StudioChoroplethEmptyValueArgs;

export const StudioChoroplethGradient = Template.bind({});
const StudioChoroplethGradientArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 6000 },
            { x: 'Île de France', y: 3500 },
            { x: 'Corsica', y: 9500 },
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
            { x: 'France', y: 60.04854 },
            { x: 'Île de France', y: 35 },
            { x: 'Corsica', y: 95.054 },
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

export const StudioChoroplethCustomTooltip = Template.bind({});
const StudioChoroplethCustomTooltipArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: df,
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
        tooltip: {
            label: (featureName) => {
                return `Hello I'm <div style="color: red">${featureName}</div> and my value is <div style="color: red">${
                    df.find((item) => item.x === featureName)
                        ? df.find((item) => item.x === featureName).y
                        : ''
                }</div>`;
            },
        },
    },
};
StudioChoroplethCustomTooltip.args = StudioChoroplethCustomTooltipArgs;

export const StudioChoroplethComplexTooltip = Template.bind({});

const StudioChoroplethComplexTooltipArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: df,
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
        tooltip: {
            label: (featureName) => {
                return `<div style="display: flex; flex-direction: column; justify-items: center; align-items: center">
                        <h2 style="border-bottom: 1px solid lightgrey">${featureName}</h2>
                        <img src="${IMAGES.rocket}" style="margin-bottom: 15px"></img>
                        <div style="margin-bottom: 15px">Number of space rockets: ${
                            df.find((item) => item.x === featureName)
                                ? df.find((item) => item.x === featureName).y
                                : ''
                        }</div>
                    </div>`;
            },
        },
    },
};
StudioChoroplethComplexTooltip.args = StudioChoroplethComplexTooltipArgs;
