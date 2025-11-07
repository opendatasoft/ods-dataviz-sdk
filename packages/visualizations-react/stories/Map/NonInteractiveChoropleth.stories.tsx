import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import * as turf from '@turf/turf';
import { ChoroplethGeoJsonProps } from '@opendatasoft/visualizations';
import { ChoroplethGeoJson } from 'src';

import { shapes } from './data';

const meta: Meta<typeof ChoroplethGeoJson> = {
    title: 'Map/Non Interactive Choropleth',
    component: ChoroplethGeoJson,
};
export default meta;

const makeMiniMaps = (n: number) =>
    [...Array(n)].map((_, i) => {
        const feature = shapes.features[i % shapes.features.length];
        const bbox = turf.bbox(feature);
        return {
            shapes: {
                type: 'FeatureCollection' as const,
                features: [feature],
            },
            label: feature.properties?.name || `Default label shape number ${i}`,
            bbox,
        };
    });

const Template: StoryObj<typeof ChoroplethGeoJson> = args => (
    <div
        style={{
            width: '50%',
            minHeight: '100px',
            minWidth: '100px',
            margin: 'auto',
            border: '1px solid black',
        }}
    >
        <ChoroplethGeoJson {...args} />
    </div>
);

export const NonInteractiveChoropleth = Template.bind({});
const NonInteractiveChoroplethArgs: ChoroplethGeoJsonProps = {
    data: {
        value: [
            { x: 'France', y: 60 },
            { x: 'Île de France', y: 35 },
            { x: 'Corsica', y: 95 },
        ],
    },
    options: {
        shapes,
        aspectRatio: 1,
        activeShapes: ['France'],
        interactive: false,
        navigationMaps: [...makeMiniMaps(3)],
    },
};
NonInteractiveChoropleth.args = NonInteractiveChoroplethArgs;
