import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PoiMapOptions, DataFrame } from '@opendatasoft/visualizations';
import { shapes } from './data';
import { PoiGeoJson, Props } from '../../src';

const DEMO_BASEMAP = 'https://demotiles.maplibre.org/style.json';

const meta: ComponentMeta<typeof PoiGeoJson> = {
    title: 'Poi/GeoJson',
    component: PoiGeoJson,
};

export default meta;

const Template: ComponentStory<typeof PoiGeoJson> = (args: Props<DataFrame, PoiMapOptions>) => (
    <div
        style={{
            width: '50%',
            minHeight: '100px',
            minWidth: '100px',
            margin: 'auto',
            border: '1px solid black',
        }}
    >
        <PoiGeoJson {...args} />
    </div>
);

export const PoiMapNoLayersParams = Template.bind({});
const PoiMapNoLayersParamsArgs: Props<DataFrame, PoiMapOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'Paris', y: 60 },
            { x: 'Ile de France', y: 35 },
            { x: 'Corsica', y: 95 },
            { x: 'Nantes', y: 60 },
            { x: 'Marseille', y: 35 },
            { x: 'Bordeaux', y: 95 },
        ],
    },
    options: {
        shapes,
        style: DEMO_BASEMAP,
    },
};
PoiMapNoLayersParams.args = PoiMapNoLayersParamsArgs;

const layerParams = {
    colors: ['#B42222', 'Green'],
    matchValues: ['Paris', 'Nantes'],
    matchKey: 'key',
};

export const PoiMapNonInteractive = Template.bind({});

const PoiMapNonInteractiveArgs: Props<DataFrame, PoiMapOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'Paris', y: 60 },
            { x: 'Ile de France', y: 35 },
            { x: 'Corsica', y: 95 },
            { x: 'Nantes', y: 60 },
            { x: 'Marseille', y: 35 },
            { x: 'Bordeaux', y: 95 },
        ],
    },
    options: {
        shapes,
        layerParams,
        style: DEMO_BASEMAP,
        interactive: false,
    },
};
PoiMapNonInteractive.args = PoiMapNonInteractiveArgs;

export const PoiMapMatchExpression = Template.bind({});

const PoiMapMatchExpressionArgs: Props<DataFrame, PoiMapOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'Paris', y: 60 },
            { x: 'Ile de France', y: 35 },
            { x: 'Corsica', y: 95 },
            { x: 'Nantes', y: 60 },
            { x: 'Marseille', y: 35 },
            { x: 'Bordeaux', y: 95 },
        ],
    },
    options: {
        shapes,
        layerParams,
        style: DEMO_BASEMAP,
    },
};
PoiMapMatchExpression.args = PoiMapMatchExpressionArgs;
