import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import type { ChoroplethGeoJsonProps, TooltipParams } from '@opendatasoft/visualizations';
import { ChoroplethGeoJson } from 'src';

import { IMAGES, defaultLinks } from '../utils';
import { shapes } from './data';

const meta: Meta<typeof ChoroplethGeoJson> = {
    title: 'Map/Tooltip',
    component: ChoroplethGeoJson,
};

export default meta;

export const DefaultTooltip: StoryObj<typeof ChoroplethGeoJson> = {
    args: {
        data: {
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
            links: defaultLinks,
        },
    },
    render: (args: ChoroplethGeoJsonProps) => (
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
    ),
};

export const CustomSimpleTooltip: StoryObj<typeof ChoroplethGeoJson> = {
    args: {
        data: {
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
                formatter: (feature: TooltipParams) =>
                    `Hello I'm <div style="color: red">${
                        feature.label
                    }</div> and my value is <div style="color: red">${feature.value || ''}</div>`,
            },
            links: defaultLinks,
        },
    },
    render: (args: ChoroplethGeoJsonProps) => (
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
    ),
};

export const CustomComplexTooltip: StoryObj<typeof ChoroplethGeoJson> = {
    args: {
        data: {
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
                formatter: (
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
    },
    render: (args: ChoroplethGeoJsonProps) => (
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
    ),
};
