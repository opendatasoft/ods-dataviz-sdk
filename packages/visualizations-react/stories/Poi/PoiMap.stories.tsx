import React from 'react';
import { BBox } from 'geojson';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import type { Layer } from '@opendatasoft/visualizations';
import { PopupDisplayTypes } from '@opendatasoft/visualizations';

import sources from './sources';
import { PoiMap } from '../../src';
import { timeout } from '../utils';

const BASE_STYLE = 'https://demotiles.maplibre.org/style.json';

const layer1 : Layer = {
    id: 'layer-001',
    source: "cities",
    type: "circle",
    color: 'black',
    popup: {
        display: PopupDisplayTypes.Tooltip,
        getContent: async (_, properties) => {
            await timeout(500);
            const {key} = properties as {key: string};
            return Promise.resolve(`<h4>${key}</h4>`);
        },
        getLoadingContent: () => 'Loading...',
    }
};

const layer2 : Layer = {
    id: 'layer-002',
    source: "battles",
    type: "circle",
    color: 'red',
    popup: {
        display: PopupDisplayTypes.Sidebar,
        getContent: async (_, properties) => {
            await timeout(500);
            const {name, date, description} = properties as {name: string, date: string, description: string};
            return Promise.resolve(`<h4>${name}</h4><p>${description}<p/><small>${date}</small>`);
        },
        getLoadingContent: () => 'Loading...',
    }
};

const layers = [layer1, layer2];

const citiesColorMatch =  {
    key: 'key',
    colors: {Paris: 'blue', Nantes: 'yellow', Bordeaux: 'purple', Marseille : 'lightblue' }
};

const bbox : BBox = [ -6.855469,41.343825,11.645508,51.371780];

const meta: ComponentMeta<typeof PoiMap> = {
    title: 'Poi/PoiMap',
    component: PoiMap,
};

export default meta;

const Template: ComponentStory<typeof PoiMap> = args => (
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
export const PoiMapNoLayersParams : ComponentStory<typeof PoiMap> = Template.bind({});
const PoiMapNoLayersParamsArgs = {
    data: {},
    options: {style: BASE_STYLE, bbox}
};
PoiMapNoLayersParams.args = PoiMapNoLayersParamsArgs;

/**
 * STORY: No interactive
 */
export const PoiMapNonInteractive : ComponentStory<typeof PoiMap> = Template.bind({});
const PoiMapNonInteractiveArgs = {
    data:  {value:{ layers, sources}},
    options: {
        style: BASE_STYLE,
        bbox,
        interactive: false,
    },
};
PoiMapNonInteractive.args = PoiMapNonInteractiveArgs;

/**
 * STORY: With match expression
 */
export const PoiMapMatchExpression : ComponentStory<typeof PoiMap> = Template.bind({});
const PoiMapMatchExpressionArgs = {
    data:  {value:{ layers: [{...layer1, colorMatch: citiesColorMatch}, layer2], sources}},
    options: {style: BASE_STYLE, bbox },
};
PoiMapMatchExpression.args = PoiMapMatchExpressionArgs;
