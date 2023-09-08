import React from 'react';
import { BBox } from 'geojson';
import { PoiMapData } from '@opendatasoft/visualizations';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { shapes as data } from './data';
import { PoiMap } from '../../src';

const BASE_STYLE = 'https://demotiles.maplibre.org/style.json';

const layers: PoiMapData['layers'] = [
    {
        id: 'data-layer-001',
        source: 'data',
        type: 'circle',
        color: '#B42222',
        colorMatch: {
            key: 'key',
            colors: {
                Paris: 'blue',
                Nantes: 'yellow',
                Bordeaux: 'purple',
                Corsica: 'white',
                Marseille: 'lightblue',
            },
        },
    },
];

const bbox: BBox = [-6.855469, 41.343825, 11.645508, 51.37178];

const meta: ComponentMeta<typeof PoiMap> = {
    title: 'Poi/PoiMap',
    component: PoiMap,
};

export default meta;

const Template: ComponentStory<typeof PoiMap> = (args) => (
    <div
        style={{
            width: '50%',
            minHeight: '100px',
            minWidth: '100px',
            margin: 'auto',
            border: '1px solid black',
        }}
    >
        <PoiMap {...args} />
    </div>
);

/**
 * STORY: No layer params
 */
export const PoiMapNoLayersParams: ComponentStory<typeof PoiMap> = Template.bind({});
const PoiMapNoLayersParamsArgs = {
    data: {},
    options: { style: BASE_STYLE, bbox },
};
PoiMapNoLayersParams.args = PoiMapNoLayersParamsArgs;

/**
 * STORY: No interactive
 */
export const PoiMapNonInteractive: ComponentStory<typeof PoiMap> = Template.bind({});
const PoiMapNonInteractiveArgs = {
    data: {
        value: { layers, sources: { [layers[0].source]: { type: 'geojson' as const, data } } },
    },
    options: {
        style: BASE_STYLE,
        layers,
        interactive: false,
    },
};
PoiMapNonInteractive.args = PoiMapNonInteractiveArgs;

/**
 * STORY: With match expression
 */
export const PoiMapMatchExpression: ComponentStory<typeof PoiMap> = Template.bind({});
const PoiMapMatchExpressionArgs = {
    data: {
        value: {
            layers,
            sources: { [layers[0].source]: { type: 'geojson' as const, data } },
        },
    },
    options: { style: BASE_STYLE, bbox },
};
PoiMapMatchExpression.args = PoiMapMatchExpressionArgs;

/**
 * STORY: With legend on start alignement
 */
export const PoiMapLegendStart: ComponentStory<typeof PoiMap> = Template.bind({});
const PoiMapLegendStartArgs = {
    data: {
        value: {
            layers,
            sources: { [layers[0].source]: { type: 'geojson' as const, data } },
        },
    },
    options: {
        style: BASE_STYLE,
        bbox,
        title: "Lorem Ipsum",
        subtitle: "Dolor Sit Amet",
        desciption: "More aria description",
        legend: {
            type: 'category' as const,
            title: "I Am Legend",
            items: [
                { label: 'category 1', color: '#F5C2C1', borderColor: 'red', variant: 'circle' as const },
                { label: 'category 2', color: '#90EE90', borderColor: 'green', variant: 'circle' as const },
                { label: 'category 3', color: '#ADD8E6', borderColor: 'blue', variant: 'circle' as const },
            ],
            alignement: 'start' as const,
        },
    },
};
PoiMapLegendStart.args = PoiMapLegendStartArgs;

/**
 * STORY: With legend on center alignement
 */
export const PoiMapLegendCenter: ComponentStory<typeof PoiMap> = Template.bind({});
const PoiMapLegendCenterArgs = {
    data: {
        value: {
            layers,
            sources: { [layers[0].source]: { type: 'geojson' as const, data } },
        },
    },
    options: {
        style: BASE_STYLE,
        bbox,
        title: "Lorem Ipsum",
        subtitle: "Dolor Sit Amet",
        desciption: "More aria description",
        legend: {
            type: 'category' as const,
            title: "I Am Legend",
            items: [
                { label: 'category 1', color: '#F5C2C1', borderColor: 'red', variant: 'circle' as const },
                { label: 'category 2', color: '#90EE90', borderColor: 'green', variant: 'circle' as const },
                { label: 'category 3', color: '#ADD8E6', borderColor: 'blue', variant: 'circle' as const },
            ],
            alignement: 'center' as const,
        },
    },
};
PoiMapLegendCenter.args = PoiMapLegendCenterArgs;
