import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
    POIMapOptionsB,
    DataFrame,
} from '@opendatasoft/visualizations';
import { shapes } from './data';
import { POIGeoJson, Props } from '../../src';

const meta: ComponentMeta<typeof POIGeoJson> = {
    title: 'POI/GeoJson',
    component: POIGeoJson,
};

export default meta;

const Template: ComponentStory<typeof POIGeoJson> = (
    args: Props<DataFrame, POIMapOptionsB>
) => (
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

export const POIMap = Template.bind({});
const POIMapArgs: Props<DataFrame, POIMapOptionsB> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 60 },
            { x: 'Île de France', y: 35 },
            { x: 'Corsica', y: 95 },
        ],
    },
    options: {
        shapes
    }
};
POIMap.args = POIMapArgs;