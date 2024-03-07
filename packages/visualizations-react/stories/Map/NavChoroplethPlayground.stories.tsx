import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
    ColorScaleTypes,
    ChoroplethVectorTilesOptions,
    ChoroplethVectorTilesProps,
} from '@opendatasoft/visualizations';
import * as turf from '@turf/turf';
import { ChoroplethVectorTiles } from 'src';
import { shapesTiles, regShapes, dataReg } from './data';

const meta: ComponentMeta<typeof ChoroplethVectorTiles> = {
    title: 'Map/NavigableMapPlayground',
    component: ChoroplethVectorTiles,
};
export default meta;

const makeMiniMaps = (n: number) =>
    [...Array(n)].map((_, i) => {
        const feature = regShapes.features[i % regShapes.features.length];
        const bbox = turf.bbox(feature);
        return {
            shapes: {
                type: 'FeatureCollection' as const,
                features: [feature],
            },
            label: feature.properties?.name,
            bbox,
        };
    });

// We pass a number of maps to generate them for the story
type Args = ChoroplethVectorTilesProps & {
    numMaps: number;
};

const NavStory = ({ numMaps, ...args }: Args) => {
    const navigationMaps = makeMiniMaps(numMaps);
    const { data, options } = args;
    const navOptions: ChoroplethVectorTilesOptions = {
        ...options,
        navigationMaps,
    };

    return (
        <div
            style={{
                minHeight: '100px',
                maxHeight: '400px',
                minWidth: '100px',
                margin: 'auto',
            }}
        >
            <ChoroplethVectorTiles data={data} options={navOptions} />
        </div>
    );
};

const Template: ComponentStory<typeof NavStory> = args => <NavStory {...args} />;

export const NavMapDynamicPlayground = Template.bind({});

NavMapDynamicPlayground.argTypes = {
    numMaps: {
        control: {
            type: 'range',
            min: 1,
            max: 25,
            step: 1,
        },
    },
};

NavMapDynamicPlayground.args = {
    numMaps: 5,
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
    },
} as Args;