import React from 'react';
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
    <NavigableMap {...args} />
);
export const NavMapStory = Template.bind({});
const buttonsOptions = [...Array(5)].map((_, i) => {
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
        buttonsOptions,
    },
} as Props<DataFrame, NavigableChoroplethOptions>;