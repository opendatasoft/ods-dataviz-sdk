import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { ApiClient, fromCatalog } from '@opendatasoft/api-client';
import {
    ColorScaleTypes,
    DataFrame,
    ChoroplethOptions,
    ChoroplethTooltipFormatter,
    ChoroplethShapeTypes,
    ChoroplethTooltipMatcherTypes,
    ChoroplethShapeValues,
    TooltipParams,
} from '@opendatasoft/visualizations';
import { ChoroplethVectorTiles, Props } from '../../src';

const meta: ComponentMeta<typeof ChoroplethVectorTiles> = {
    title: 'Map/ChoroplethVector',
    component: ChoroplethVectorTiles,
};

const dataF = [
    { x: 1, y: 23, label: 'label from data 23' },
    { x: 2, y: 43, label: 'label from data 43' },
    { x: 3, y: 160, label: 'label from data 160' },
    { x: 4, y: 180, label: 'label from data 180' },
    { x: 6, y: 12, label: 'label from data 12' },
    { x: 11, y: 384, label: 'label from data 384' },
    { x: 24, y: 123, label: 'label from data 123' },
    { x: 27, y: 23, label: 'label from data 23' },
    { x: 28, y: 93, label: 'label from data 93' },
    { x: 32, y: 25, label: 'label from data 25' },
    { x: 44, y: 65, label: 'label from data 65' },
    { x: 52, y: 234 },
    { x: 53, y: 109, label: 'label from data 109' },
    { x: 75, y: 21, label: 'label from data 21' },
    { x: 84, y: 76, label: 'label from data 76' },
    { x: 93, y: 200, label: 'label from data 200' },
    { x: 94, y: 123, label: 'label from data 123' },
];

const shapes: ChoroplethShapeValues = {
    type: ChoroplethShapeTypes.VectorTiles,
    url: 'https://static.opendatasoft.com/vector-tiles/fr_40_region_2021/{z}/{x}/{y}.pbf',
    layer: 'fr_40_region_2021',
    key: 'reg_code',
    label: 'reg_code',
};

const defaultLabelCallback: ChoroplethTooltipFormatter = ({ label, value }: TooltipParams) =>
    `<b>${label}:</b> ${value}`;

export default meta;
const Template: ComponentStory<typeof ChoroplethVectorTiles> = (args: Props<DataFrame, ChoroplethOptions>) => (
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
const StudioChoroplethVectorGradientArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: dataF,
    },
    options: {
        shapes,
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
            labelFormatter: defaultLabelCallback,
        },
    },
};
StudioChoroplethVectorGradient.args = StudioChoroplethVectorGradientArgs;

export const StudioChoroplethVectorPalette = Template.bind({});
const StudioChoroplethVectorPaletteArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: dataF,
    },
    options: {
        shapes,
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
            labelFormatter: defaultLabelCallback,
        },
    },
};
StudioChoroplethVectorPalette.args = StudioChoroplethVectorPaletteArgs;

export const StudioChoroplethVectorFilter = Template.bind({});
const StudioChoroplethVectorFilterArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: dataF,
    },
    options: {
        shapes,
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
            labelFormatter: defaultLabelCallback,
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
const StudioChoroplethVectorCustomLabelArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: dataF,
    },
    options: {
        shapes,
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
            labelFormatter: defaultLabelCallback,
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
const StudioChoroplethVectorEmptyDataArgs: Props<DataFrame, ChoroplethOptions> = {
    data: {
        loading: false,
        value: undefined,
    },
    options: {
        shapes,
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
            labelFormatter: defaultLabelCallback,
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

// const StudioChoroplethVectorComArgs: Omit<Props<DataFrame, ChoroplethOptions>, 'data'> = {
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
//             labelFormatter: defaultLabelCallback,
//         },
//     },
// };
// StudioChoroplethVectorCom.args = StudioChoroplethVectorComArgs;
// StudioChoroplethVectorCom.loaders = StudioChoroplethVectorComLoader;
