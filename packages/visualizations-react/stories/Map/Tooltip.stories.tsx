import React from 'react';
import { Meta } from '@storybook/react';
import { Choropleth, Props } from '../../src';
import { ChoroplethOptions, DataFrame } from '@opendatasoft/visualizations';
import { IMAGES } from '../utils';
import { shapes } from './shapes';

const meta: Meta = {
    title: 'Map/Tooltip',
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

export const DefaultTooltip = Template.bind({});
const DefaultTooltipArgs: Props<DataFrame, ChoroplethOptions> = {
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
        activeShapes: ['France', 'Corsica'],
    },
};
DefaultTooltip.args = DefaultTooltipArgs;

export const CustomSimpleTooltip = Template.bind({});
const CustomSimpleTooltipArgs: Props<DataFrame, ChoroplethOptions> = {
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
        activeShapes: ['Corsica'],
        tooltip: {
            label: (feature) => {
                return `Hello I'm <div style="color: red">${
                    feature.label
                }</div> and my value is <div style="color: red">${feature.value || ''}</div>`;
            },
        },
    },
};
CustomSimpleTooltip.args = CustomSimpleTooltipArgs;

export const CustomComplexTooltip = Template.bind({});
const CustomComplexTooltipArgs: Props<DataFrame, ChoroplethOptions> = {
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
        activeShapes: ['Île de France'],
        tooltip: {
            label: (feature) => {
                return `<div style="display: flex; flex-direction: column; justify-items: center; align-items: center">
                        <h2 style="border-bottom: 1px solid lightgrey">${feature.label}</h2>
                        <img src="${IMAGES.rocket}" style="margin-bottom: 15px"></img>
                        <div style="margin-bottom: 15px">Number of space rockets: ${
                            feature.value || ''
                        }</div>
                    </div>`;
            },
        },
    },
};
CustomComplexTooltip.args = CustomComplexTooltipArgs;
