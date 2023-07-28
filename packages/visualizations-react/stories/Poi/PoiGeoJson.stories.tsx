import React from 'react';
import { BBox } from 'geojson';
import { PoiMapOptions, PoiMapData } from '@opendatasoft/visualizations';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PoiGeoJson, Props } from '../../src';
import { shapes as data } from './data';

const BASE_STYLE = 'https://demotiles.maplibre.org/style.json';

const layers : PoiMapOptions["layers"] = [{
    source: "data",
    type: "circle",
    color: '#B42222',
    groupBy: {
        key: 'key',
        colorMap: {Paris: 'blue', Nantes: 'yellow', Bordeaux: 'purple', Corsica: 'white', Marseille : 'lightblue' }
    }
}];

const bbox : BBox = [ -6.855469,41.343825,11.645508,51.371780];

const meta: ComponentMeta<typeof PoiGeoJson> = {
    title: 'Poi/GeoJson',
    component: PoiGeoJson,
};

export default meta;

const Template: ComponentStory<typeof PoiGeoJson> = args => (
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

/**
 * STORY: No layer params
 */
export const PoiMapNoLayersParams : ComponentStory<React.FC<Props<PoiMapData, PoiMapOptions>>> = Template.bind({});
const PoiMapNoLayersParamsArgs : Props<PoiMapData, PoiMapOptions> = {
    data: {style: BASE_STYLE},
    options: {bbox}
};
PoiMapNoLayersParams.args = PoiMapNoLayersParamsArgs;

/**
 * STORY: No interactive
 */
export const PoiMapNonInteractive : ComponentStory<React.FC<Props<PoiMapData, PoiMapOptions>>> = Template.bind({});
const PoiMapNonInteractiveArgs: Props<PoiMapData, PoiMapOptions> = {
    data:  {style: BASE_STYLE, sources: { [layers[0].source] : {type: "geojson", data}}},
    options: {
        bbox,
        layers,
        interactive: false,
    },
};
PoiMapNonInteractive.args = PoiMapNonInteractiveArgs;

/**
 * STORY: With match expression
 */
export const PoiMapMatchExpression : ComponentStory<React.FC<Props<PoiMapData, PoiMapOptions>>> = Template.bind({});
const PoiMapMatchExpressionArgs : Props<PoiMapData, PoiMapOptions> = {
    data: {
        style: BASE_STYLE, 
        sources: {[layers[0].source] : {type: "geojson", data}}
    },
    options: {bbox, layers},
};
PoiMapMatchExpression.args = PoiMapMatchExpressionArgs;
