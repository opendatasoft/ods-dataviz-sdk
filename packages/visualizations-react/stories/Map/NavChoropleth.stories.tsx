import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ColorScaleTypes, NavigableChoroplethOptions } from '@opendatasoft/visualizations';
import { NavigableMap, Props } from '../../src';
import { shapesTiles, shapes, dataF } from './data';
import { DataFrame } from '@opendatasoft/visualizations';

const meta: ComponentMeta<typeof NavigableMap> = {
    title: 'Map/NavigableMap',
    component: NavigableMap,
};
export default meta;

const Template: ComponentStory<typeof NavigableMap> = args => (
    <NavigableMap {...args} />
);
export const NavMapStory = Template.bind({});

NavMapStory.args = {
    data: {
        value: dataF,
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
        buttonsOptions: [...Array(5)].map((_, i) => ({
            shapes: {
                type: 'FeatureCollection',
                features: [shapes.features[i % shapes.features.length]],
            },
        }))
    }
} as Props<DataFrame, NavigableChoroplethOptions>;