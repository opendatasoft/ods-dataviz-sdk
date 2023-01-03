import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import type {
    ChoroplethGeoJsonOptions,
    DataFrame,
    TooltipParams,
} from '@opendatasoft/visualizations';
import { ChoroplethGeoJson, Props } from '../../src';
import { IMAGES } from '../utils';
import { shapes } from './data';

const meta: ComponentMeta<typeof ChoroplethGeoJson> = {
    title: 'Map/Tooltip',
    component: ChoroplethGeoJson,
};

export default meta;
const Template: ComponentStory<typeof ChoroplethGeoJson> = (
    args: Props<DataFrame, ChoroplethGeoJsonOptions>
) => (
    <div
        style={{
            width: '50%',
            minHeight: '100px',
            minWidth: '100px',
            margin: 'auto',
            border: '1px solid black',
        }}
    >
        <ChoroplethGeoJson {...args} />
    </div>
);

export const DefaultTooltip = Template.bind({});
const DefaultTooltipArgs: Props<DataFrame, ChoroplethGeoJsonOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 60 },
            { x: 'Île de France', y: 35 },
            { x: 'Corsica', y: 95 },
        ],
    },
    options: {
        shapes,
        aspectRatio: 1,
        activeShapes: ['France', 'Corsica'],
    },
};
DefaultTooltip.args = DefaultTooltipArgs;

export const CustomSimpleTooltip = Template.bind({});
const CustomSimpleTooltipArgs: Props<DataFrame, ChoroplethGeoJsonOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 60 },
            { x: 'Île de France', y: 35 },
            { x: 'Corsica', y: 95 },
        ],
    },
    options: {
        shapes,
        aspectRatio: 1,
        activeShapes: ['Corsica'],
        tooltip: {
            labelFormatter: (feature: TooltipParams) =>
                `Hello I'm <div style="color: red">${
                    feature.label
                }</div> and my value is <div style="color: red">${feature.value || ''}</div>`,
        },
    },
};
CustomSimpleTooltip.args = CustomSimpleTooltipArgs;

export const CustomComplexTooltip = Template.bind({});
const CustomComplexTooltipArgs: Props<DataFrame, ChoroplethGeoJsonOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 60 },
            { x: 'Île de France', y: 35 },
            { x: 'Corsica', y: 95 },
        ],
    },
    options: {
        shapes,
        aspectRatio: 1,
        activeShapes: ['Île de France'],
        tooltip: {
            labelFormatter: (
                feature: TooltipParams
            ) => `<div style="display: flex; flex-direction: column; justify-items: center; align-items: center">
                        <h2 style="border-bottom: 1px solid lightgrey">${feature.label}</h2>
                        <img src="${IMAGES.rocket}" style="margin-bottom: 15px"></img>
                        <div style="margin-bottom: 15px">Number of space rockets: ${
                            feature.value || ''
                        }</div>
                    </div>`,
        },
    },
};
CustomComplexTooltip.args = CustomComplexTooltipArgs;
