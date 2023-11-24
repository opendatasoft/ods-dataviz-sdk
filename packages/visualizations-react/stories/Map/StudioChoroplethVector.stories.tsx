import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as turf from '@turf/turf';
import {
    ColorScaleTypes,
    DataFrame,
    ChoroplethVectorTilesOptions,
    ChoroplethTooltipFormatter,
    ChoroplethTooltipMatcherTypes,
    TooltipParams,
} from '@opendatasoft/visualizations';
import { ChoroplethVectorTiles, Props } from '../../src';
import { shapesTiles, regShapes, dataReg } from './data';
import { defaultSource } from '../utils';

const meta: ComponentMeta<typeof ChoroplethVectorTiles> = {
    title: 'Map/ChoroplethVector',
    component: ChoroplethVectorTiles,
    parameters: {
        // Set a delay to make sure the Vector Tiles are loaded from their remote service, and avoid
        // snapshotting a blank render.
        // Current 2 seconds to be 100% sure and because we don't have too many stories.
        chromatic: { delay: 2000 },
    },
};

const makeMiniMaps = (n: number) =>
    [...Array(n)].map((_, i) => {
        const feature = regShapes.features[i % regShapes.features.length];
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

const defaultLabelCallback: ChoroplethTooltipFormatter = ({ label, value }: TooltipParams) =>
    `<b>${label}:</b> ${value}`;

export default meta;
const Template: ComponentStory<typeof ChoroplethVectorTiles> = (
    args: Props<DataFrame, ChoroplethVectorTilesOptions>
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
        <ChoroplethVectorTiles {...args} />
    </div>
);

export const StudioChoroplethVectorGradient = Template.bind({});
const StudioChoroplethVectorGradientArgs: Props<DataFrame, ChoroplethVectorTilesOptions> = {
    data: {
        loading: false,
        value: dataReg,
    },
    options: {
        bbox: [-17.529298, 38.79776, 23.889159, 52.836618],
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
        tooltip: {
            formatter: defaultLabelCallback,
        },
    },
};
StudioChoroplethVectorGradient.args = StudioChoroplethVectorGradientArgs;

export const StudioChoroplethVectorPalette = Template.bind({});
const StudioChoroplethVectorPaletteArgs: Props<DataFrame, ChoroplethVectorTilesOptions> = {
    data: {
        loading: false,
        value: dataReg,
    },
    options: {
        shapesTiles,
        colorScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
        },
        legend: {
            title: 'I Am Legend',
        },
        aspectRatio: 1,
        emptyValueColor: 'red',
        bbox: [-17.529298, 38.79776, 23.889159, 52.836618],
        tooltip: {
            formatter: defaultLabelCallback,
        },
    },
};
StudioChoroplethVectorPalette.args = StudioChoroplethVectorPaletteArgs;

export const StudioChoroplethVectorFilter = Template.bind({});
const StudioChoroplethVectorFilterArgs: Props<DataFrame, ChoroplethVectorTilesOptions> = {
    data: {
        loading: false,
        value: dataReg,
    },
    options: {
        shapesTiles,
        colorScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
        },
        legend: {
            title: 'I Am Legend',
        },
        emptyValueColor: '#FFFFFF',
        aspectRatio: 1,
        bbox: [-5.637513, 45.500521, 1.382751, 49.219343],
        tooltip: {
            formatter: defaultLabelCallback,
            labelMatcher: {
                type: ChoroplethTooltipMatcherTypes.KeyProperty,
                key: 'reg_code',
            },
        },
        filter: {
            key: 'reg_code',
            value: ['52', '53'],
        },
    },
};
StudioChoroplethVectorFilter.args = StudioChoroplethVectorFilterArgs;

export const StudioChoroplethVectorCustomLabel = Template.bind({});
const StudioChoroplethVectorCustomLabelArgs: Props<DataFrame, ChoroplethVectorTilesOptions> = {
    data: {
        loading: false,
        value: dataReg,
    },
    options: {
        shapesTiles,
        colorScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
        },
        legend: {
            title: 'I Am Legend',
        },
        emptyValueColor: '#CBD2DB',
        aspectRatio: 1,
        bbox: [-5.637513, 45.500521, 1.382751, 49.219343],
        tooltip: {
            formatter: defaultLabelCallback,
            labelMatcher: {
                type: ChoroplethTooltipMatcherTypes.KeyMap,
                mapping: {
                    52: 'Pays de la Loire',
                    53: 'Bretagne',
                },
            },
        },
        filter: {
            key: 'reg_code',
            value: ['52', '53'],
        },
    },
};
StudioChoroplethVectorCustomLabel.args = StudioChoroplethVectorCustomLabelArgs;

export const StudioChoroplethVectorEmptyData = Template.bind({});
const StudioChoroplethVectorEmptyDataArgs: Props<DataFrame, ChoroplethVectorTilesOptions> = {
    data: {
        loading: false,
        value: undefined,
    },
    options: {
        shapesTiles,
        colorScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
        },
        legend: {
            title: 'I Am Legend',
        },
        emptyValueColor: '#CBD2DB',
        aspectRatio: 1,
        bbox: [-5.637513, 45.500521, 1.382751, 49.219343],
        tooltip: {
            formatter: defaultLabelCallback,
            labelMatcher: {
                type: ChoroplethTooltipMatcherTypes.KeyMap,
                mapping: {
                    52: 'Pays de la Loire',
                    53: 'Bretagne',
                },
            },
        },
        filter: {
            key: 'reg_code',
            value: ['52', '53'],
        },
    },
};
StudioChoroplethVectorEmptyData.args = StudioChoroplethVectorEmptyDataArgs;

export const StudioChoroplethVectorLegendLeft = Template.bind({});
const StudioChoroplethVectorLegendLeftArgs: Props<DataFrame, ChoroplethVectorTilesOptions> = {
    data: {
        loading: false,
        value: dataReg,
    },
    options: {
        shapesTiles,
        colorScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
        },
        title: 'Lorem Ipsum',
        subtitle: 'Dolor Sit Amet',
        legend: {
            title: 'I Am Legend',
            position: 'left',
        },
        emptyValueColor: '#CBD2DB',
        aspectRatio: 1,
        bbox: [-5.637513, 45.500521, 1.382751, 49.219343],
        tooltip: {
            formatter: defaultLabelCallback,
        },
        filter: {
            key: 'reg_code',
            value: ['52', '53'],
        },
    },
};
StudioChoroplethVectorLegendLeft.args = StudioChoroplethVectorLegendLeftArgs;

export const StudioChoroplethVectorLegendRight = Template.bind({});
const StudioChoroplethVectorLegendRightArgs: Props<DataFrame, ChoroplethVectorTilesOptions> = {
    data: {
        loading: false,
        value: dataReg,
    },
    options: {
        shapesTiles,
        colorScale: {
            type: ColorScaleTypes.Palette,
            colors: ['#bcf5f9', '#89c5fd', '#3a80ec', '#0229bf'],
        },
        title: 'Lorem Ipsum',
        subtitle: 'Dolor Sit Amet',
        legend: {
            title: 'I Am Legend',
            position: 'right',
        },
        emptyValueColor: '#CBD2DB',
        aspectRatio: 1,
        bbox: [-5.637513, 45.500521, 1.382751, 49.219343],
        tooltip: {
            formatter: defaultLabelCallback,
        },
        filter: {
            key: 'reg_code',
            value: ['52', '53'],
        },
    },
};
StudioChoroplethVectorLegendRight.args = StudioChoroplethVectorLegendRightArgs;

export const StudioChoroplethNavigationMapButtons = Template.bind({});
const StudioChoroplethNavigationMapButtonsArgs: Props<DataFrame, ChoroplethVectorTilesOptions> = {
    data: {
        loading: false,
        value: dataReg,
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
        tooltip: {
            formatter: defaultLabelCallback,
        },
        bbox: [-17.529298, 38.79776, 23.889159, 52.836618],
        navigationMaps: [...makeMiniMaps(15),],
        sourceLink: defaultSource,
    },
};
StudioChoroplethNavigationMapButtons.args = StudioChoroplethNavigationMapButtonsArgs;

export const StudioChoroplethVectorCooperativeGestures = Template.bind({});
const StudioChoroplethVectorCooperativeGesturesArgs: Props<DataFrame, ChoroplethVectorTilesOptions> = {
    data: {
        loading: false,
        value: dataReg,
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
        tooltip: {
            formatter: defaultLabelCallback,
        },
        bbox: [-17.529298, 38.79776, 23.889159, 52.836618],
        navigationMaps: [...makeMiniMaps(15),],
        sourceLink: defaultSource,
        cooperativeGestures: {
            windowsHelpText: 'Use Ctrl + scroll to zoom the map',
            macHelpText: 'Use ⌘ + scroll to zoom the map',
            mobileHelpText: 'Use two fingers to move the map',
        },
    },
};
StudioChoroplethVectorCooperativeGestures.args = StudioChoroplethVectorCooperativeGesturesArgs;

/* The next story was used for the demo, but its too big for chromatic, keeping it hear for future ref on loading/wathever */
// const LoaderTemplate: ComponentStory<typeof Choropleth> = (args, { loaded: { data } }) => (
//     <div
//         style={{
//             width: '50%',
//             minHeight: '100px',
//             minWidth: '100px',
//             margin: 'auto',
//             border: '1px solid black',
//         }}
//     >
//         <Choropleth {...args} {...data} />
//     </div>
// );
// export const StudioChoroplethVectorCom = LoaderTemplate.bind({});

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const apiClient: any= new ApiClient({ domain: 'public' });
// const query = fromCatalog()
//     .dataset('population-millesimee-communes-2016')
//     .exports('json')
//     .select('code_insee as x, population_totale as y');

// const getValue = async () => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const value: any = await apiClient.get(query);
//     return value;
// };

// const StudioChoroplethVectorComLoader = [
//     async () => ({
//         data: {
//             data: {
//                 isLoading: false,
//                 value: await getValue(),
//             }
//         }
//     })
// ];

// const StudioChoroplethVectorComArgs: Omit<Props<DataFrame, ChoroplethVectorTilesOptions>, 'data'> = {
//     options: {
//         shapes: irisShapes,
//         colorScale: {
//             type: ColorScaleTypes.Gradient,
//             colors: {
//                 start: '#bcf5f9',
//                 end: '#0229bf',
//             },
//         },
//         legend: {
//             title: 'I Am Legend',
//         },
//         emptyValueColor: 'red',
//         aspectRatio: 1,
//         bbox: [-17.529298, 38.79776, 23.889159, 52.836618],
//         tooltip: {
//             formatter: defaultLabelCallback,
//         },
//     },
// };
// StudioChoroplethVectorCom.args = StudioChoroplethVectorComArgs;
// StudioChoroplethVectorCom.loaders = StudioChoroplethVectorComLoader;
