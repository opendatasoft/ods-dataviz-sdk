import React from 'react';
import { BBox } from 'geojson';
import { PoiMapData } from '@opendatasoft/visualizations';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PoiGeoJson } from '../../src';
import { shapes as data } from './data';

const BASE_STYLE = 'https://demotiles.maplibre.org/style.json';

const layers : PoiMapData["layers"] = [{
    id: 'data-layer-001',
    source: "data",
    type: "circle",
    color: '#B42222',
    colorMatch: {
        key: 'key',
        colors: {Paris: 'blue', Nantes: 'yellow', Bordeaux: 'purple', Corsica: 'white', Marseille : 'lightblue' }
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
    data: {},
    options: {style: BASE_STYLE, bbox}
};
PoiMapNoLayersParams.args = PoiMapNoLayersParamsArgs;

/**
 * STORY: No interactive
 */
export const PoiMapNonInteractive : ComponentStory<typeof PoiGeoJson> = Template.bind({});
const PoiMapNonInteractiveArgs = {
    data:  {value:{ layers, sources: { [layers[0].source] : {type: "geojson" as const, data}}}},
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
export const PoiMapMatchExpression : ComponentStory<typeof PoiGeoJson> = Template.bind({});
const PoiMapMatchExpressionArgs = {
    data: {
        value: {
            layers,
            sources: {[layers[0].source] : {type: "geojson" as const, data}}
        }
    },
    options: {style: BASE_STYLE, bbox },
};
PoiMapMatchExpression.args = PoiMapMatchExpressionArgs;
