import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as turf from '@turf/turf';
import {
    ChoroplethGeoJsonOptions,
    TooltipParams,
    DataFrame,
    ColorScaleTypes,
    ChoroplethTooltipFormatter,
    LegendPositions,
} from '@opendatasoft/visualizations';
import { ChoroplethGeoJson, Props } from '../../src';
import { shapes, multiPolygonShapes } from './data';
import { IMAGES } from '../utils';

const meta: ComponentMeta<typeof ChoroplethGeoJson> = {
    title: 'Map/Choropleth',
    component: ChoroplethGeoJson,
};

const makeMiniMaps = (n: number) =>
    [...Array(n)].map((_, i) => {
        const feature = shapes.features[i % shapes.features.length];
        const bbox = turf.bbox(feature);
        return {
            shapes: {
                type: 'FeatureCollection' as const,
                features: [feature],
            },
            label: feature.properties?.name || `Default label shape number ${i}`,
            bbox,
        };
    });

const df = [
    { x: 'France', y: 60 },
    { x: 'Île de France', y: 35 },
    { x: 'Corsica', y: 95 },
];

const defaultLabelCallback: ChoroplethTooltipFormatter = ({ label, value }: TooltipParams) =>
    `<b>${label}:</b> ${value}`;

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

export const StudioChoropleth = Template.bind({});
const StudioChoroplethArgs: Props<DataFrame, ChoroplethGeoJsonOptions> = {
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
        emptyValueColor: 'red',
        tooltip: {
            labelFormatter: defaultLabelCallback,
        },
        aspectRatio: 1,
        attribution: 'Testing attribution',
    },
};
StudioChoropleth.args = StudioChoroplethArgs;

export const StudioChoroplethMultiPolygon = Template.bind({});
const StudioChoroplethMultiPolygonArgs: Props<DataFrame, ChoroplethGeoJsonOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France & Corsica', y: 60 },
            { x: 'Île de France', y: 35 },
        ],
    },
    options: {
        shapes: multiPolygonShapes,
        emptyValueColor: 'red',
        tooltip: {
            labelFormatter: defaultLabelCallback,
        },
        aspectRatio: 1,
    },
};
StudioChoroplethMultiPolygon.args = StudioChoroplethMultiPolygonArgs;

export const StudioChoroplethEmptyValue = Template.bind({});
const StudioChoroplethEmptyValueArgs: Props<DataFrame, ChoroplethGeoJsonOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 60 },
            { x: 'Corsica', y: 95 },
        ],
    },
    options: {
        shapes,
        emptyValueColor: 'red',
        tooltip: {
            labelFormatter: defaultLabelCallback,
        },
        aspectRatio: 1,
    },
};
StudioChoroplethEmptyValue.args = StudioChoroplethEmptyValueArgs;

export const StudioChoroplethGradient = Template.bind({});
const StudioChoroplethGradientArgs: Props<DataFrame, ChoroplethGeoJsonOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 6000 },
            { x: 'Île de France', y: 3500 },
            { x: 'Corsica', y: 9500 },
        ],
    },
    options: {
        shapes,
        emptyValueColor: 'red',
        tooltip: {
            labelFormatter: defaultLabelCallback,
        },
        colorScale: {
            type: ColorScaleTypes.Gradient,
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
const StudioChoroplethPaletteArgs: Props<DataFrame, ChoroplethGeoJsonOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 60.04854 },
            { x: 'Île de France', y: 35 },
            { x: 'Corsica', y: 95.054 },
        ],
    },
    options: {
        shapes,
        emptyValueColor: 'red',
        tooltip: {
            labelFormatter: defaultLabelCallback,
        },
        colorScale: {
            type: ColorScaleTypes.Palette,
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
const StudioChoroplethCustomTooltipArgs: Props<DataFrame, ChoroplethGeoJsonOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        shapes,
        emptyValueColor: 'red',
        colorScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
        },
        aspectRatio: 1,
        legend: {
            title: 'I Am Legend',
        },
        tooltip: {
            labelFormatter: (feature: TooltipParams) =>
                `Hello I'm <div style="color: red">${
                    feature.label
                }</div> and my value is <div style="color: red">${feature.value || ''}</div>`,
        },
    },
};
StudioChoroplethCustomTooltip.args = StudioChoroplethCustomTooltipArgs;

export const StudioChoroplethComplexTooltip = Template.bind({});

const StudioChoroplethComplexTooltipArgs: Props<DataFrame, ChoroplethGeoJsonOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        shapes,
        emptyValueColor: 'red',
        colorScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
        },
        aspectRatio: 1,
        legend: {
            title: 'I Am Legend',
        },
        tooltip: {
            labelFormatter: (feature: TooltipParams) =>
                `<div style="display: flex; flex-direction: column; justify-items: center; align-items: center">
                    <h2 style="border-bottom: 1px solid lightgrey">${feature.label}</h2>
                    <img src="${IMAGES.rocket}" style="margin-bottom: 15px"></img>
                    <div style="margin-bottom: 15px">Number of space rockets: ${
                        feature.value || ''
                    }</div>
                </div>`,
        },
    },
};
StudioChoroplethComplexTooltip.args = StudioChoroplethComplexTooltipArgs;

export const StudioChoroplethLongLabels = Template.bind({});
const StudioChoroplethLongLabelsArgs: Props<DataFrame, ChoroplethGeoJsonOptions> = {
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
        emptyValueColor: 'red',
        tooltip: {
            labelFormatter: defaultLabelCallback,
        },
        colorScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#1e03fd', '#0229bf'],
        },
        aspectRatio: 1,
        legend: {
            title: 'I Am Legend',
        },
    },
};
StudioChoroplethLongLabels.args = StudioChoroplethLongLabelsArgs;

export const StudioChoroplethEmptyData = Template.bind({});
const StudioChoroplethEmptyDataArgs: Props<DataFrame, ChoroplethGeoJsonOptions> = {
    data: {},
    options: {
        shapes,
        emptyValueColor: 'grey',
        colorScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
        },
        aspectRatio: 1,
        legend: {
            title: 'I Am Legend',
        },
        tooltip: {
            labelFormatter: (feature: TooltipParams) =>
                `Hello I'm <div style="color: red">${
                    feature.label
                }</div> and my value is <div style="color: red">${feature.value || ''}</div>`,
        },
    },
};
StudioChoroplethEmptyData.args = StudioChoroplethEmptyDataArgs;

export const StudioChoroplethLegendLeft = Template.bind({});
const StudioChoroplethLegendLeftArgs: Props<DataFrame, ChoroplethGeoJsonOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 6000 },
            { x: 'Île de France', y: 3500 },
            { x: 'Corsica', y: 9500 },
        ],
    },
    options: {
        shapes,
        emptyValueColor: 'red',
        colorScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
        },
        aspectRatio: 1,
        title: 'Lorem Ipsum',
        subtitle: 'Dolor Sit Amet',
        legend: {
            title: 'I Am Legend',
            position: LegendPositions.Left,
        },
        tooltip: {
            labelFormatter: defaultLabelCallback,
        },
    },
};
StudioChoroplethLegendLeft.args = StudioChoroplethLegendLeftArgs;

export const StudioChoroplethLegendRight = Template.bind({});
const StudioChoroplethLegendRightArgs: Props<DataFrame, ChoroplethGeoJsonOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 6000 },
            { x: 'Île de France', y: 3500 },
            { x: 'Corsica', y: 9500 },
        ],
    },
    options: {
        shapes,
        emptyValueColor: 'red',
        colorScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
        },
        aspectRatio: 1,
        title: 'Lorem Ipsum',
        subtitle: 'Dolor Sit Amet',
        legend: {
            title: 'I Am Legend',
            position: LegendPositions.Right,
        },
        tooltip: {
            labelFormatter: defaultLabelCallback,
        },
    },
};
StudioChoroplethLegendRight.args = StudioChoroplethLegendRightArgs;

export const StudioChoroplethNavigationMapButtons = Template.bind({});
const StudioChoroplethNavigationMapButtonsArgs: Props<DataFrame, ChoroplethGeoJsonOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 60.04854 },
            { x: 'Île de France', y: 35 },
            { x: 'Corsica', y: 95.054 },
        ],
    },
    options: {
        shapes,
        emptyValueColor: 'red',
        tooltip: {
            labelFormatter: defaultLabelCallback,
        },
        colorScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
        },
        aspectRatio: 1,
        legend: {
            title: 'I Am Legend',
        },
        navigationMaps: [...makeMiniMaps(15),],
    },
};
StudioChoroplethNavigationMapButtons.args = StudioChoroplethNavigationMapButtonsArgs;
