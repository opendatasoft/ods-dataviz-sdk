import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
    DataFrame,
    ChoroplethVectorTilesOptions,
} from '@opendatasoft/visualizations';
import { ChoroplethVectorTiles, Props } from '../../src';
import { shapesTiles, dataReg } from './data';

const meta: ComponentMeta<typeof ChoroplethVectorTiles> = {
    title: 'Demo/Vector',
    component: ChoroplethVectorTiles,
    parameters: {
        // Set a delay to make sure the Vector Tiles are loaded from their remote service, and avoid
        // snapshotting a blank render.
        // Current 2 seconds to be 100% sure and because we don't have too many stories.
        chromatic: { delay: 2000 },
    },
};

export default meta;

type Args = Props<DataFrame, Omit<ChoroplethVectorTilesOptions, 'navigationMaps' | 'activeShapes'>> & {
    numMaps: number;
};
const VectorBase = ({numMaps, ...args }: Args) => (
    <div
        style={{
            display: 'flex',
            flexWrap: 'wrap',
        }}
    >
        {[...Array(numMaps)].map(() => (
            <div
                style={{
                    height: '200px',
                    width: '200px',
                }}
            >
                <ChoroplethVectorTiles {...args} />
            </div>
        ))}
    </div>
);
const VectorTemplate: ComponentStory<typeof VectorBase> = args => <VectorBase {...args} />;

export const MaplibreStory = VectorTemplate.bind({});
const MaplibreStoryArgs: Props<DataFrame, ChoroplethVectorTilesOptions> & { numMaps: number }= {
    numMaps: 5,
    data: {
        loading: false,
        value: dataReg,
    },
    options: {
        shapesTiles,
        bbox: [-5.637513, 45.500521, 1.382751, 49.219343],
        aspectRatio: 1,
        emptyValueColor: 'red',
    },
};

MaplibreStory.argTypes = {
    numMaps: {
        control: {
            type: 'range',
            min: 1,
            max: 50,
            step: 1,
        },
    },
};
MaplibreStory.args = MaplibreStoryArgs;

