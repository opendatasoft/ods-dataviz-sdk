import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ColorScaleTypes, NavigableChoroplethOptions , DataFrame } from '@opendatasoft/visualizations';
import * as turf from "@turf/turf";
import { NavigableMap, Props } from '../../src';
import { shapesTiles, regShapes, dataReg } from './data';

const meta: ComponentMeta<typeof NavigableMap> = {
    title: 'Map/NavigableMap',
    component: NavigableMap,
};
export default meta;

const Template: ComponentStory<typeof NavigableMap> = args => (
    <div
        style={{
            minHeight: '100px',
            maxHeight: '400px',
            minWidth: '100px',
            margin: 'auto',
        }}
    >
        <NavigableMap {...args} />
    </div>
);
export const NavMapStory = Template.bind({});
const navigationMaps = [...Array(9)].map((_, i) => {
    const feature = regShapes.features[i % regShapes.features.length];
    const bbox = turf.bbox(feature);
    return {
        shapes: {
            type: 'FeatureCollection',
            features: [feature],
        },
        bbox,
    };
});

        
NavMapStory.args = {
    data: {
        value: dataReg,
        loading: false,
    },
    options: {
        shapesTiles,
        colorScale: {
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
        navigationMaps,
    },
} as Props<DataFrame, NavigableChoroplethOptions>;