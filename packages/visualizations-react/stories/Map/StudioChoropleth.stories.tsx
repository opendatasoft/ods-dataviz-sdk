import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as turf from '@turf/turf';
import {
    ChoroplethGeoJsonProps,
    TooltipParams,
    ColorScaleTypes,
    ChoroplethTooltipFormatter,
} from '@opendatasoft/visualizations';
import { ChoroplethGeoJson } from 'src';

import { shapes, multiPolygonShapes, worldCopies } from './data';
import { IMAGES, defaultLinks } from '../utils';

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

const Template: ComponentStory<typeof ChoroplethGeoJson> = args => (
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
const StudioChoroplethArgs: ChoroplethGeoJsonProps = {
    data: {
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
            formatter: defaultLabelCallback,
        },
        aspectRatio: 1,
        attribution: 'Testing attribution',
        description: 'Accessible description',
        links: defaultLinks,
    },
};
StudioChoropleth.args = StudioChoroplethArgs;

export const StudioChoroplethMultiPolygon = Template.bind({});
const StudioChoroplethMultiPolygonArgs: ChoroplethGeoJsonProps = {
    data: {
        value: [
            { x: 'France & Corsica', y: 60 },
            { x: 'Île de France', y: 35 },
        ],
    },
    options: {
        shapes: multiPolygonShapes,
        emptyValueColor: 'red',
        tooltip: {
            formatter: defaultLabelCallback,
        },
        aspectRatio: 1,
        links: defaultLinks,
    },
};
StudioChoroplethMultiPolygon.args = StudioChoroplethMultiPolygonArgs;

export const StudioChoroplethEmptyValue = Template.bind({});
const StudioChoroplethEmptyValueArgs: ChoroplethGeoJsonProps = {
    data: {
        value: [
            { x: 'France', y: 60 },
            { x: 'Corsica', y: 95 },
        ],
    },
    options: {
        shapes,
        emptyValueColor: 'red',
        tooltip: {
            formatter: defaultLabelCallback,
        },
        aspectRatio: 1,
        links: defaultLinks,
    },
};
StudioChoroplethEmptyValue.args = StudioChoroplethEmptyValueArgs;

export const StudioChoroplethGradient = Template.bind({});
const StudioChoroplethGradientArgs: ChoroplethGeoJsonProps = {
    data: {
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
            formatter: defaultLabelCallback,
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
        links: defaultLinks,
    },
};
StudioChoroplethGradient.args = StudioChoroplethGradientArgs;

export const StudioChoroplethPalette = Template.bind({});
const StudioChoroplethPaletteArgs: ChoroplethGeoJsonProps = {
    data: {
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
            formatter: defaultLabelCallback,
        },
        colorScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
        },
        aspectRatio: 1,
        legend: {
            title: 'I Am Legend',
        },
        links: defaultLinks,
    },
};
StudioChoroplethPalette.args = StudioChoroplethPaletteArgs;

export const StudioChoroplethCustomTooltip = Template.bind({});
const StudioChoroplethCustomTooltipArgs: ChoroplethGeoJsonProps = {
    data: {
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
            formatter: (feature: TooltipParams) =>
                `Hello I'm <div style="color: red">${
                    feature.label
                }</div> and my value is <div style="color: red">${feature.value || ''}</div>`,
        },
        links: defaultLinks,
    },
};
StudioChoroplethCustomTooltip.args = StudioChoroplethCustomTooltipArgs;

export const StudioChoroplethComplexTooltip = Template.bind({});

const StudioChoroplethComplexTooltipArgs: ChoroplethGeoJsonProps = {
    data: {
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
            formatter: (feature: TooltipParams) =>
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
const StudioChoroplethLongLabelsArgs: ChoroplethGeoJsonProps = {
    data: {
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
            formatter: defaultLabelCallback,
        },
        colorScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#1e03fd', '#0229bf'],
        },
        aspectRatio: 1,
        legend: {
            title: 'I Am Legend',
        },
        links: defaultLinks,
    },
};
StudioChoroplethLongLabels.args = StudioChoroplethLongLabelsArgs;

export const StudioChoroplethEmptyData = Template.bind({});
const StudioChoroplethEmptyDataArgs: ChoroplethGeoJsonProps = {
    data: {
        value: [],
    },
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
            formatter: (feature: TooltipParams) =>
                `Hello I'm <div style="color: red">${
                    feature.label
                }</div> and my value is <div style="color: red">${feature.value || ''}</div>`,
        },
        links: defaultLinks,
    },
};
StudioChoroplethEmptyData.args = StudioChoroplethEmptyDataArgs;

export const StudioChoroplethLegendLeft = Template.bind({});
const StudioChoroplethLegendLeftArgs: ChoroplethGeoJsonProps = {
    data: {
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
            position: 'left',
        },
        tooltip: {
            formatter: defaultLabelCallback,
        },
        links: defaultLinks,
    },
};
StudioChoroplethLegendLeft.args = StudioChoroplethLegendLeftArgs;

export const StudioChoroplethLegendRight = Template.bind({});
const StudioChoroplethLegendRightArgs: ChoroplethGeoJsonProps = {
    data: {
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
            position: 'right',
        },
        tooltip: {
            formatter: defaultLabelCallback,
        },
        links: defaultLinks,
    },
};
StudioChoroplethLegendRight.args = StudioChoroplethLegendRightArgs;

export const StudioChoroplethNavigationMapButtons = Template.bind({});
const StudioChoroplethNavigationMapButtonsArgs: ChoroplethGeoJsonProps = {
    data: {
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
            formatter: defaultLabelCallback,
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
        links: defaultLinks,
    },
};
StudioChoroplethNavigationMapButtons.args = StudioChoroplethNavigationMapButtonsArgs;

export const StudioChoroplethPreventWorldCopies = Template.bind({});
const StudioChoroplethPreventWorldCopiesArgs: ChoroplethGeoJsonProps = {
    data: {
        value: [],
    },
    options: {
        shapes: worldCopies,
        emptyValueColor: 'red',
        aspectRatio: 3,
        title: 'Prevent world copies',
        subtitle: 'You should see two rectangles and one circle',
        links: defaultLinks,
    },
};
StudioChoroplethPreventWorldCopies.args = StudioChoroplethPreventWorldCopiesArgs;

export const StudioChoroplethCooperativeGestures = Template.bind({});
const StudioChoroplethCooperativeGesturesArgs: ChoroplethGeoJsonProps = {
    data: {
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
            formatter: defaultLabelCallback,
        },
        aspectRatio: 1,
        attribution: 'Testing attribution',
        description: 'Accessible description',
        cooperativeGestures: {
            windowsHelpText: 'Use Ctrl + scroll to zoom the map',
            macHelpText: 'Use ⌘ + scroll to zoom the map',
            mobileHelpText: 'Use two fingers to move the map',
        },
        links: defaultLinks,
    },
};
StudioChoroplethCooperativeGestures.args = StudioChoroplethCooperativeGesturesArgs;