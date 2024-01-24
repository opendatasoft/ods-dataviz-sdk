import React, { useEffect, useState } from 'react';
import { BBox } from 'geojson';
import { CATEGORY_ITEM_VARIANT, POPUP_DISPLAY } from '@opendatasoft/visualizations';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import type {
    Layer,
    PoiMapOptions,
    PopupDisplayTypes,
    PopupLayer,
} from '@opendatasoft/visualizations';

import { defaultSource, timeout } from '../utils';

import sources from './sources';
import { PoiMap } from '../../src';

const BASE_STYLE = 'https://demotiles.maplibre.org/style.json';

const layer1: Layer = {
    id: 'layer-001',
    source: 'cities',
    type: 'circle',
    color: 'black',
    borderColor: 'white',
    popup: {
        display: POPUP_DISPLAY.tooltip,
        getContent: async (_, properties) => {
            await timeout(500);
            const { key, description } = properties as Record<string, unknown>;
            return Promise.resolve(`<b>${key}</b><div>${description}<div>`);
        },
        getLoadingContent: () => 'Loading...',
    },
};

const layer2: Layer = {
    id: 'layer-002',
    source: 'battles',
    type: 'symbol',
    iconImageId: 'battle-icon',
    popup: {
        display: POPUP_DISPLAY.sidebar,
        getContent: async (_, properties) => {
            await timeout(500);
            const { name, date, description } = properties as {
                name: string;
                date: string;
                description: string;
            };
            return Promise.resolve(`<b>${name}</b><p>${description}<p/><small>${date}</small>`);
        },
        getLoadingContent: () => 'Loading...',
    },
};

const layers = [layer1, layer2];

const citiesColorMatch = {
    key: 'key',
    colors: {
        Paris: 'blue',
        'Paris--duplicate': 'lightblue',
        Nantes: 'yellow',
        Bordeaux: 'purple',
        Marseille: 'lightblue',
    },
    borderColors: {
        Paris: 'white',
        'Paris--duplicate': 'white',
        Nantes: 'black',
        Bordeaux: 'white',
        Marseille: 'black',
    },
};

const battleImageMatch = {
    key: 'name',
    imageIds: { 'Battle of Verdun': 'battle-icon-red' },
};

const bbox: BBox = [-6.855469, 41.343825, 11.645508, 51.37178];

const legendCitiesItems = [
    {
        label: 'Paris',
        color: citiesColorMatch.colors.Paris,
        borderColor: citiesColorMatch.borderColors.Paris,
        variant: CATEGORY_ITEM_VARIANT.Circle,
    },
    {
        label: 'Nantes',
        color: citiesColorMatch.colors.Nantes,
        borderColor: citiesColorMatch.borderColors.Nantes,
        variant: CATEGORY_ITEM_VARIANT.Circle,
    },
    {
        label: 'Bordeaux',
        color: citiesColorMatch.colors.Bordeaux,
        borderColor: citiesColorMatch.borderColors.Bordeaux,
        variant: CATEGORY_ITEM_VARIANT.Circle,
    },
    {
        label: 'Marseille',
        color: citiesColorMatch.colors.Marseille,
        borderColor: citiesColorMatch.borderColors.Marseille,
        variant: CATEGORY_ITEM_VARIANT.Circle,
    },
];

const legendbattleItems = [
    {
        variant: CATEGORY_ITEM_VARIANT.Image,
        label: 'Battle of Verdun',
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Battle_icon_gladii_red.svg/14px-Battle_icon_gladii_red.svg.png',
    },
    {
        variant: CATEGORY_ITEM_VARIANT.Image,
        label: 'Battle of the Somme',
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Big_battle_symbol.svg/14px-Big_battle_symbol.svg.png',
    },
];

const legend = {
    type: 'category' as const,
    title: 'French cities and famous battles',
    items: [...legendCitiesItems, ...legendbattleItems],
    align: 'start' as const,
};

const images: PoiMapOptions['images'] = {
    'battle-icon': {
        id: 'battle-icon',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Big_battle_symbol.svg/14px-Big_battle_symbol.svg.png',
    },
    'battle-icon-red': {
        id: 'battle-icon-red',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Battle_icon_gladii_red.svg/14px-Battle_icon_gladii_red.svg.png',
    },
};
const options: PoiMapOptions = {
    style: BASE_STYLE,
    bbox,
    title: 'Lorem Ipsum',
    subtitle: 'Dolor Sit Amet',
    description: 'More aria description',
    sourceLink: defaultSource,
    images,
};

const meta: ComponentMeta<typeof PoiMap> = {
    title: 'Poi/PoiMap',
    component: PoiMap,
};

export default meta;

const Template: ComponentStory<typeof PoiMap> = (args) => (
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
export const PoiMapNoLayersParams: ComponentStory<typeof PoiMap> = Template.bind({});
const PoiMapNoLayersParamsArgs = {
    data: {},
    options,
};
PoiMapNoLayersParams.args = PoiMapNoLayersParamsArgs;

/**
 * STORY: No interactive
 */
export const PoiMapNonInteractive: ComponentStory<typeof PoiMap> = Template.bind({});
const PoiMapNonInteractiveArgs = {
    data: { value: { layers, sources } },
    options: { ...options, interactive: false },
};
PoiMapNonInteractive.args = PoiMapNonInteractiveArgs;

/**
 * STORY: With match expression
 */
export const PoiMapMatchExpression: ComponentStory<typeof PoiMap> = Template.bind({});
const PoiMapMatchExpressionArgs = {
    data: {
        value: {
            layers: [
                { ...layer1, colorMatch: citiesColorMatch },
                { ...layer2, iconImageMatch: battleImageMatch },
            ],
            sources,
        },
    },
    options,
};
PoiMapMatchExpression.args = PoiMapMatchExpressionArgs;

/**
 * STORY: With legend on start align
 */
export const PoiMapLegendStart: ComponentStory<typeof PoiMap> = Template.bind({});
const PoiMapLegendStartArgs = {
    data: {
        value: {
            layers: [
                { ...layer1, colorMatch: citiesColorMatch },
                { ...layer2, iconImageMatch: battleImageMatch },
            ],
            sources,
        },
    },
    options: { ...options, legend },
};
PoiMapLegendStart.args = PoiMapLegendStartArgs;

/**
 * STORY: With legend on center align
 */
export const PoiMapLegendCenter: ComponentStory<typeof PoiMap> = Template.bind({});
const PoiMapLegendCenterArgs = {
    data: {
        value: {
            layers: [
                { ...layer1, colorMatch: citiesColorMatch },
                { ...layer2, iconImageMatch: battleImageMatch },
            ],
            sources,
        },
    },
    options: { ...options, legend: { ...legend, align: 'center' as const } },
};
PoiMapLegendCenter.args = PoiMapLegendCenterArgs;

/**
 * STORY: with min and max zoom
 */
export const PoiMapMinMaxZooms: ComponentStory<typeof PoiMap> = Template.bind({});
const PoiMapMinMaxZoomsArgs = {
    data: {
        value: {
            layers: [
                { ...layer1, colorMatch: citiesColorMatch },
                { ...layer2, iconImageMatch: battleImageMatch },
            ],
            sources,
        },
    },
    options: {
        ...options,
        legend,
        minZoom: 3,
        maxZoom: 5,
    },
};
PoiMapMinMaxZooms.args = PoiMapMinMaxZoomsArgs;

/**
 * STORY: with cooperative gestures
 */
export const PoiMapCooperativeGestures: ComponentStory<typeof PoiMap> = Template.bind({});
const PoiMapCooperativeGesturesArgs = {
    data: {
        value: {
            layers: [
                { ...layer1, colorMatch: citiesColorMatch },
                { ...layer2, iconImageMatch: battleImageMatch },
            ],
            sources,
        },
    },
    options: {
        ...options,
        legend,
        cooperativeGestures: {
            windowsHelpText: 'Use Ctrl + scroll to zoom the map',
            macHelpText: 'Use ⌘ + scroll to zoom the map',
            mobileHelpText: 'Use two fingers to move the map',
        },
    },
};
PoiMapCooperativeGestures.args = PoiMapCooperativeGesturesArgs;

/**
 * STORY: with cooperative gestures
 */

const StudioResponsiveUsageTemplate = () => {
    const [props, setProps] = useState({
        data: {
            value: {
                layers,
                sources,
            },
        },
        options: {
            ...options,
            legend,
        },
    });

    useEffect(() => {
        const onResize = () => {
            const popupDisplay: PopupDisplayTypes =
                window.innerWidth > 600 ? POPUP_DISPLAY.sidebar : POPUP_DISPLAY.modal;
            setProps({
                ...props,
                data: {
                    value: {
                        layers: [
                            {
                                ...layer1,
                                popup: { ...(layer1.popup as PopupLayer), display: popupDisplay },
                            },
                            {
                                ...layer2,
                                popup: { ...(layer2.popup as PopupLayer), display: popupDisplay },
                            },
                        ],
                        sources,
                    },
                },
            });
        };

        window.addEventListener('resize', onResize); // Update the width on resize

        return () => window.removeEventListener('resize', onResize);
    });

    return (
        <>
            <h2>
                Change the size of the preview (between mobile and tablet) to see popup changes its
                display to modal{' '}
            </h2>
            <PoiMap {...props} />
        </>
    );
};
export const StudioResponsiveUsage: ComponentStory<typeof PoiMap> = StudioResponsiveUsageTemplate;

StudioResponsiveUsage.parameters = {
    chromatic: { disableSnapshot: true },
};
