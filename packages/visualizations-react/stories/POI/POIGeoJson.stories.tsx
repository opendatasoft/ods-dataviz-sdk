import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { POIMapOptions, DataFrame } from '@opendatasoft/visualizations';
import { shapes } from './data';
import { POIGeoJson, Props } from '../../src';

const DEMO_BASEMAP = 'https://demotiles.maplibre.org/style.json';

const meta: ComponentMeta<typeof POIGeoJson> = {
    title: 'POI/GeoJson',
    component: POIGeoJson,
};

export default meta;

const Template: ComponentStory<typeof POIGeoJson> = (args: Props<DataFrame, POIMapOptions>) => (
    <div
        style={{
            width: '50%',
            minHeight: '100px',
            minWidth: '100px',
            margin: 'auto',
            border: '1px solid black',
        }}
    >
        <POIGeoJson {...args} />
    </div>
);

export const POIMapNoLayersParams = Template.bind({});
const POIMapNoLayersParamsArgs: Props<DataFrame, POIMapOptions> = {
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
POIMapNoLayersParams.args = POIMapNoLayersParamsArgs;

export const POIMap = Template.bind({});
const layerParams = [
    { color: '#B42222', matchKey: 'Red', matchProperty: 'cat' },
    { color: '#0000FF', matchKey: 'Blue', matchProperty: 'cat' },
];

const POIMapArgs: Props<DataFrame, POIMapOptions> = {
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
POIMap.args = POIMapArgs;

export const POIMapNonInteractive = Template.bind({});

const POIMapNonInteractiveArgs: Props<DataFrame, POIMapOptions> = {
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
POIMapNonInteractive.args = POIMapNonInteractiveArgs;
