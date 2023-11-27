import { BBox } from 'geojson';
import { Async, CATEGORY_ITEM_VARIANT, Layer, POPUP_DISPLAY, PoiMapData, PoiMapOptions } from '@opendatasoft/visualizations';

import { defaultSource, timeout } from '../utils';

export const sources : PoiMapData["sources"] = {
    cities : {
        type: 'geojson', 
        data: {
            type: 'FeatureCollection',
            features: [
                {
                    id: 1,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [2.357573,48.837904],
                    },
                    properties: {
                        key: 'Paris',
                        description: 'Officia deserunt commodo enim ea ad veniam enim consectetur aliquip adipisicing duis. Exercitation aute velit pariatur est et ea qui veniam ad duis quis ad aliquip. Ipsum exercitation dolor tempor deserunt sunt amet laborum tempor excepteur est sunt ea quis.'
                    },
                },
                {
                    id: 2,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-0.563328,44.838245],
                    },
                    properties: {
                        key: 'Bordeaux',
                        description: 'Pariatur duis mollit sit id ullamco ea non ad dolore voluptate nostrud deserunt fugiat proident. Sunt dolor qui consectetur exercitation mollit proident Lorem laborum cillum sit Lorem id eiusmod. Lorem culpa tempor aliqua aliquip reprehenderit. Aute officia reprehenderit aute pariatur incididunt nostrud exercitation voluptate id est ex. Qui eiusmod est enim est ipsum elit laboris.'
                    },
                },
                {
                    id: 3,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-1.552924,47.214847],
                    },
                    properties: {
                        key: 'Nantes',
                        description: "Irure incididunt deserunt officia eiusmod occaecat duis nostrud sint excepteur. Id non voluptate non proident sunt sit nisi eiusmod sit excepteur duis cillum adipisicing. Nostrud officia ad tempor quis commodo aute elit tempor reprehenderit esse est aute fugiat reprehenderit. Aliquip eu occaecat Lorem cupidatat labore consequat. Culpa commodo sunt proident exercitation. Enim voluptate minim veniam enim nulla aute dolor magna est elit aliqua. Ex occaecat fugiat laboris do do dolor nostrud cupidatat."
                    },
                },
                {
                    id: 4,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [5.360529,43.303114],
                    },
                    properties: {
                        key: 'Marseille',
                        description: "Dolore nisi non id labore. Ea deserunt irure nisi nisi deserunt anim nisi et. Culpa sint mollit deserunt ea eiusmod laborum nostrud."
                    },
                },
            ],
        }
    },
    battles : {
        type: 'geojson',
        data: {
            type: "FeatureCollection",
            features: [
                { 
                    id: 5,
                    type: "Feature",
                    properties: {
                        name: "Battle of Verdun",
                        date: "1916",
                        description: "The Battle of Verdun was fought from 21 February to 18 December 1916 on the Western Front in France. The battle was the longest of the First World War and took place on the hills north of Verdun-sur-Meuse. Nisi magna dolor ullamco Lorem culpa ea tempor exercitation dolor ex cupidatat esse voluptate ea. Incididunt consectetur ut officia eiusmod voluptate commodo adipisicing tempor eiusmod esse nulla veniam ut. Aute ipsum eiusmod culpa dolore ea aliquip nulla consectetur reprehenderit in mollit nostrud. Elit commodo non est voluptate pariatur. Exercitation reprehenderit pariatur dolore aute elit ea dolor commodo cillum. Est dolore ut elit in. Ullamco est laborum aute labore. Cillum incididunt laboris do eiusmod fugiat enim veniam aliquip duis incididunt laboris anim nostrud. Laborum mollit esse magna fugiat fugiat fugiat aliquip." 
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [5.422, 49.208]
                    }
                },
                {
                    id: 6,
                    type: "Feature",
                    properties: {
                        name: "Battle of the Somme",
                        date: "1916",
                        description: "The Battle of the Somme, also known as the Somme offensive, was a battle of the First World War fought by the armies of the British Empire and the French Third Republic against the German Empire."
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [2.712, 49.993 ]
                    }
                },
            ]
          }
          
    }
};

export const BASE_STYLE = 'https://demotiles.maplibre.org/style.json';

export const citiesColorMatch = {
    key: 'key',
    colors: { Paris: 'blue', Nantes: 'yellow', Bordeaux: 'purple', Marseille: 'lightblue' },
    borderColors: { Paris: 'white', Nantes: 'black', Bordeaux: 'white', Marseille: 'black' },
};

export const battleImageMatch = {
    key: 'name',
    imageIds: { 'Battle of Verdun': 'battle-icon-red' },
};

export const layer1: Layer = {
    id: 'layer-001',
    source: 'cities',
    type: 'circle',
    color: 'black',
    borderColor: 'white',
    colorMatch: citiesColorMatch,
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

export const layer2: Layer = {
    id: 'layer-002',
    source: 'battles',
    type: 'symbol',
    iconImageId: 'battle-icon',
    iconImageMatch: battleImageMatch,
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

export const legendCitiesItems = [
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

export const legendbattleItems = [
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

export function getDataAndOptions(withMatch = false) : {data: Async<PoiMapData>, options: PoiMapOptions}  {
    return {
        layers: [
            {
                ...layer1, 
                ...(withMatch ? {colorMatch: citiesColorMatch} : null)
            }, 
            {
                ...layer2, 
                ...(withMatch ? {iconImageMatch: battleImageMatch} : null)
            }
        ],
        legend: {
            type: 'category' as const,
            title: 'French cities and famous battles',
            items: withMatch ? [...legendCitiesItems, ...legendbattleItems] : [],
            align: 'start' as const,
        }
    };
};

export const layers = [layer1, layer2];

export const bbox: BBox = [-6.855469, 41.343825, 11.645508, 51.37178];



export const options: PoiMapOptions = {
    style: BASE_STYLE,
    bbox,
    title: 'Lorem Ipsum',
    subtitle: 'Dolor Sit Amet',
    description: 'More aria description',
    sourceLink: defaultSource,
    images: {
        'battle-icon':
            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Big_battle_symbol.svg/14px-Big_battle_symbol.svg.png',
        'battle-icon-red':
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Battle_icon_gladii_red.svg/14px-Battle_icon_gladii_red.svg.png',
    },
};
