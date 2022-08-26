import React from 'react';
import { Meta } from '@storybook/react';
import { Choropleth, Props } from '../../src';
import {
    ColorScaleTypes,
    DataFrame,
    ChoroplethOptions,
    ChoroplethTooltipFormatter,
} from '@opendatasoft/visualizations';
import { shapes, multiPolygonShapes } from './shapes';
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

const defaultLabelCallback: ChoroplethTooltipFormatter = ({ label, value }) =>
    `<b>${label}:</b> ${value}`;

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
        shapes: shapes,
        emptyValueColor: 'red',
        tooltip: {
            label: defaultLabelCallback,
        },
        aspectRatio: 1,
    },
};
StudioChoropleth.args = StudioChoroplethArgs;

export const StudioChoroplethMultiPolygon = Template.bind({});
const StudioChoroplethMultiPolygonArgs: Props<DataFrame, ChoroplethOptions> = {
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
            label: defaultLabelCallback,
        },
        aspectRatio: 1,
    },
};
StudioChoroplethMultiPolygon.args = StudioChoroplethMultiPolygonArgs;

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
        shapes: shapes,
        emptyValueColor: 'red',
        tooltip: {
            label: defaultLabelCallback,
        },
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
        shapes: shapes,
        emptyValueColor: 'red',
        tooltip: {
            label: defaultLabelCallback,
        },
        colorsScale: {
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
        shapes: shapes,
        emptyValueColor: 'red',
        tooltip: {
            label: defaultLabelCallback,
        },
        colorsScale: {
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
const StudioChoroplethCustomTooltipArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: df,
    },
    options: {
        shapes: shapes,
        emptyValueColor: 'red',
        colorsScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
        },
        aspectRatio: 1,
        legend: {
            title: 'I Am Legend',
        },
        tooltip: {
            label: (feature) => {
                return `Hello I'm <div style="color: red">${
                    feature.label
                }</div> and my value is <div style="color: red">${feature.value || ''}</div>`;
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
        shapes: shapes,
        emptyValueColor: 'red',
        colorsScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
        },
        aspectRatio: 1,
        legend: {
            title: 'I Am Legend',
        },
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
StudioChoroplethComplexTooltip.args = StudioChoroplethComplexTooltipArgs;

export const StudioChoroplethLongLabels = Template.bind({});
const StudioChoroplethLongLabelsArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 600.05 },
            { x: 'Île de France', y: 350.05 },
            { x: 'Corsica', y: 950000.05 },
        ],
    },
    options: {
        shapes: shapes,
        emptyValueColor: 'red',
        tooltip: {
            label: defaultLabelCallback,
        },
        colorsScale: {
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

export const StudioVectorTilesChoropleth = Template.bind({});
const StudioVectorTilesChoroplethArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: [
            { x: '01', y: 10 },
            { x: '02', y: 2 },
            { x: '03', y: 30 },
            { x: '04', y: 4 },
            { x: '05', y: 50 },
            { x: '06', y: 6 },
            { x: '11', y: 100 },
            { x: '24', y: 8 },
            { x: '27', y: 90 },
            { x: '28', y: 10 },
            { x: '32', y: 110 },
            { x: '44', y: 12 },
            { x: '52', y: 130 },
            { x: '53', y: 14 },
            { x: '75', y: 150 },
            { x: '76', y: 16 },
            { x: '84', y: 170 },
            { x: '93', y: 18 },
            { x: '94', y: 190 },
            { x: '975', y: 20 },
            { x: '977', y: 210 },
            { x: '978', y: 22 },
            { x: '984', y: 230 },
            { x: '986', y: 24 },
            { x: '987', y: 250 },
            { x: '988', y: 26 },
            { x: '989', y: 270 },
        ],
    },
    options: {
        shapes: {
            type: 'vtiles',
            url: 'https://static.opendatasoft.com/vector-tiles/fr_40_region_2021/{z}/{x}/{y}.pbf',
            sourceLayer: 'fr_40_region_2021',
            key: 'reg_code',
        },
        activeShapes: ['11', '93'],
        emptyValueColor: 'red',
        colorsScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#1e03fd', '#0229bf'],
        },
        aspectRatio: 1,
        legend: {
            title: 'I Am Legend',
        },
        tooltip: {
            label: defaultLabelCallback,
        },
    },
};
StudioVectorTilesChoropleth.args = StudioVectorTilesChoroplethArgs;
