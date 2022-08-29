import React from 'react';
import { Meta } from '@storybook/react';
import { Choropleth, Props } from '../../src';
import {
    ColorScaleTypes,
    DataFrame,
    ChoroplethOptions,
    ChoroplethTooltipFormatter,
} from '@opendatasoft/visualizations';

const meta: Meta = {
    title: 'Map/ChoroplethVector',
    component: Choropleth,
};

const dataF: any = [
    { x: 1, y: 23 },
    { x: 2, y: 43 },
    { x: 3, y: 160 },
    { x: 4, y: 180 },
    { x: 6, y: 12 },
    { x: 11, y: 384 },
    { x: 24, y: 123 },
    { x: 27, y: 23 },
    { x: 28, y: 93 },
    { x: 32, y: 25 },
    { x: 44, y: 65 },
    { x: 52, y: 234 },
    { x: 53, y: 109 },
    { x: 75, y: 21 },
    { x: 84, y: 76 },
    { x: 93, y: 200 },
    { x: 94, y: 123 },
];

const shapes: any = {
    type: 'vtiles',
    url: 'https://static.opendatasoft.com/vector-tiles/fr_40_region_2021/{z}/{x}/{y}.pbf',
    sourceLayer: 'fr_40_region_2021',
    key: 'reg_code',
    label: 'reg_code',
};

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

export const StudioChoroplethVectorGradient = Template.bind({});
const StudioChoroplethVectorGradientArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: dataF,
    },
    options: {
        shapes,
        colorsScale: {
            type: ColorScaleTypes.Gradient,
            colors: {
                start: '#bcf5f9',
                end: '#0229bf',
            },
        },
        legend: {
            title: 'I Am Legend',
        },
        aspectRatio: 1,
        activeShapes: ['11', '93'],
        emptyValueColor: 'red',
        fixedBbox: [-180, -85.051129, 180, 85.051129],
        tooltip: {
            label: defaultLabelCallback,
        },
    },
};
StudioChoroplethVectorGradient.args = StudioChoroplethVectorGradientArgs;

export const StudioChoroplethVectorPalette = Template.bind({});
const StudioChoroplethVectorPaletteArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: dataF,
    },
    options: {
        shapes,
        colorsScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
        },
        legend: {
            title: 'I Am Legend',
        },
        aspectRatio: 1,
        emptyValueColor: 'red',
        fixedBbox: [-17.529298, 38.79776, 23.889159, 52.836618],
        tooltip: {
            label: defaultLabelCallback,
        },
    },
};
StudioChoroplethVectorPalette.args = StudioChoroplethVectorPaletteArgs;

export const StudioChoroplethVectorFilter = Template.bind({});
const StudioChoroplethVectorFilterArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: dataF,
    },
    options: {
        shapes,
        colorsScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
        },
        legend: {
            title: 'I Am Legend',
        },
        emptyValueColor: '#FFFFFF',
        aspectRatio: 1,
        fixedBbox: [-5.637513, 45.500521, 1.382751, 49.219343],
        tooltip: {
            label: defaultLabelCallback,
        },
        filter: [52, 53],
    },
};
StudioChoroplethVectorFilter.args = StudioChoroplethVectorFilterArgs;
