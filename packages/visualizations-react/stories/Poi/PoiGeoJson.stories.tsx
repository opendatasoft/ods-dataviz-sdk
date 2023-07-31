import React from 'react';
import { BBox } from 'geojson';
import { PoiMapOptions } from '@opendatasoft/visualizations';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PoiGeoJson } from '../../src';
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
export const PoiMapNoLayersParams : ComponentStory<typeof PoiGeoJson> = Template.bind({});
const PoiMapNoLayersParamsArgs = {
    data: {value: {style: BASE_STYLE}},
    options: {bbox}
};
PoiMapNoLayersParams.args = PoiMapNoLayersParamsArgs;

/**
 * STORY: No interactive
 */
export const PoiMapNonInteractive : ComponentStory<typeof PoiGeoJson> = Template.bind({});
const PoiMapNonInteractiveArgs = {
    data:  {value:{style: BASE_STYLE, sources: { [layers[0].source] : {type: "geojson" as const, data}}}},
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
export const PoiMapMatchExpression : ComponentStory<typeof PoiGeoJson> = Template.bind({});
const PoiMapMatchExpressionArgs = {
    data: {
        value: {
            style: BASE_STYLE, 
            sources: {[layers[0].source] : {type: "geojson" as const, data}}
        }
    },
    options: {bbox, layers},
};
PoiMapMatchExpression.args = PoiMapMatchExpressionArgs;
