import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PoiMapOptions, Async } from '@opendatasoft/visualizations';
import { FeatureCollection } from 'geojson';
import { shapes } from './data';
import { PoiGeoJson, Props } from '../../src';

const DEMO_BASEMAP = 'https://demotiles.maplibre.org/style.json';

const meta: ComponentMeta<typeof PoiGeoJson> = {
    title: 'Poi/GeoJson',
    component: PoiGeoJson,
};

export default meta;

const Template: ComponentStory<typeof PoiGeoJson> = (args: Props<FeatureCollection, PoiMapOptions>) => (
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
const PoiMapNoLayersParamsArgs: Props<FeatureCollection, PoiMapOptions> = {
    data: shapes as Async<FeatureCollection>,
    options: {
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

const PoiMapNonInteractiveArgs: Props<FeatureCollection, PoiMapOptions> = {
    data: shapes as Async<FeatureCollection>,
    options: {
        layerParams,
        style: DEMO_BASEMAP,
        interactive: false,
    },
};
PoiMapNonInteractive.args = PoiMapNonInteractiveArgs;

export const PoiMapMatchExpression = Template.bind({});

const PoiMapMatchExpressionArgs: Props<FeatureCollection, PoiMapOptions> = {
    data: shapes as Async<FeatureCollection>,
    options: {
        layerParams,
        style: DEMO_BASEMAP,
    },
};
PoiMapMatchExpression.args = PoiMapMatchExpressionArgs;
