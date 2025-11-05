import { PoiMapData } from '@opendatasoft/visualizations';
import { coordinates } from './moselle';

const sources: Required<PoiMapData>['value']['sources'] = {
    cities: {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: [
                {
                    id: 1,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [2.357573, 48.837904],
                    },
                    properties: {
                        key: 'Paris--duplicate',
                        description: 'Same location as Paris',
                    },
                },
                {
                    id: 2,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [2.357573, 48.837904],
                    },
                    properties: {
                        key: 'Paris',
                        description:
                            'Officia deserunt commodo enim ea ad veniam enim consectetur aliquip adipisicing duis. Exercitation aute velit pariatur est et ea qui veniam ad duis quis ad aliquip. Ipsum exercitation dolor tempor deserunt sunt amet laborum tempor excepteur est sunt ea quis.',
                    },
                },
                {
                    id: 3,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-0.563328, 44.838245],
                    },
                    properties: {
                        key: 'Bordeaux',
                        description:
                            'Pariatur duis mollit sit id ullamco ea non ad dolore voluptate nostrud deserunt fugiat proident. Sunt dolor qui consectetur exercitation mollit proident Lorem laborum cillum sit Lorem id eiusmod. Lorem culpa tempor aliqua aliquip reprehenderit. Aute officia reprehenderit aute pariatur incididunt nostrud exercitation voluptate id est ex. Qui eiusmod est enim est ipsum elit laboris.',
                    },
                },
                {
                    id: 4,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [-1.552924, 47.214847],
                    },
                    properties: {
                        key: 'Nantes',
                        description:
                            'Irure incididunt deserunt officia eiusmod occaecat duis nostrud sint excepteur. Id non voluptate non proident sunt sit nisi eiusmod sit excepteur duis cillum adipisicing. Nostrud officia ad tempor quis commodo aute elit tempor reprehenderit esse est aute fugiat reprehenderit. Aliquip eu occaecat Lorem cupidatat labore consequat. Culpa commodo sunt proident exercitation. Enim voluptate minim veniam enim nulla aute dolor magna est elit aliqua. Ex occaecat fugiat laboris do do dolor nostrud cupidatat.',
                    },
                },
                {
                    id: 5,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [5.360529, 43.303114],
                    },
                    properties: {
                        key: 'Marseille',
                        description:
                            'Dolore nisi non id labore. Ea deserunt irure nisi nisi deserunt anim nisi et. Culpa sint mollit deserunt ea eiusmod laborum nostrud.',
                    },
                },
            ],
        },
    },
    battles: {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: [
                {
                    id: 5,
                    type: 'Feature',
                    properties: {
                        name: 'Battle of Verdun',
                        date: '1916',
                        description:
                            'The Battle of Verdun was fought from 21 February to 18 December 1916 on the Western Front in France. The battle was the longest of the First World War and took place on the hills north of Verdun-sur-Meuse. Nisi magna dolor ullamco Lorem culpa ea tempor exercitation dolor ex cupidatat esse voluptate ea. Incididunt consectetur ut officia eiusmod voluptate commodo adipisicing tempor eiusmod esse nulla veniam ut. Aute ipsum eiusmod culpa dolore ea aliquip nulla consectetur reprehenderit in mollit nostrud. Elit commodo non est voluptate pariatur. Exercitation reprehenderit pariatur dolore aute elit ea dolor commodo cillum. Est dolore ut elit in. Ullamco est laborum aute labore. Cillum incididunt laboris do eiusmod fugiat enim veniam aliquip duis incididunt laboris anim nostrud. Laborum mollit esse magna fugiat fugiat fugiat aliquip.',
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [5.422, 49.208],
                    },
                },
                {
                    id: 6,
                    type: 'Feature',
                    properties: {
                        name: 'Battle of the Somme',
                        date: '1916',
                        description:
                            'The Battle of the Somme, also known as the Somme offensive, was a battle of the First World War fought by the armies of the British Empire and the French Third Republic against the German Empire.',
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [2.712, 49.993],
                    },
                },
            ],
        },
    },
    moselle: {
        type: 'geojson',
        generateId: true,
        data: {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {
                        name: 'Moselle',
                        code: '57',
                        region: 'Grand Est',
                    },
                    geometry: {
                        type: 'Polygon',
                        coordinates: coordinates,
                    },
                },
            ],
        },
    },
    maginot: {
        type: 'geojson',
        generateId: true,
        data: {
            type: 'Feature',
            properties: {
                name: 'Ligne Maginot',
                description: 'Simplified path of the Maginot Line along the French eastern border.',
            },
            geometry: {
                type: 'LineString',
                coordinates: [
                    [7.5536, 47.5649],
                    [7.3328, 47.748],
                    [7.2561, 48.0],
                    [7.3, 48.25],
                    [7.2, 48.6],
                    [7.1, 48.9],
                    [6.95, 49.2],
                    [6.7, 49.5],
                    [6.4, 49.6],
                    [5.95, 49.55],
                ],
            },
        },
    },
    rivers: {
        type: 'geojson',
        generateId: true,
        data: {
            type: 'Feature',
            properties: {
                name: 'Fleuves Français',
                description: 'Principaux fleuves de France sous forme de MultiLineString',
            },
            geometry: {
                type: 'MultiLineString',
                coordinates: [
                    [
                        [-0.5669, 47.25],
                        [0.0833, 47.35],
                        [0.68, 47.39],
                        [1.25, 47.39],
                        [2.0, 47.2],
                        [3.1, 47.4],
                        [4.8, 47.0],
                    ],
                    [
                        [0.15, 49.5],
                        [0.5, 49.4],
                        [1.2, 49.0],
                        [2.35, 48.85],
                        [3.3, 48.5],
                        [3.5, 48.0],
                    ],
                    [
                        [6.1, 46.2],
                        [5.7, 45.9],
                        [4.83, 45.76],
                        [4.7, 44.5],
                        [4.9, 43.8],
                    ],
                    [
                        [0.55, 42.8],
                        [0.75, 43.5],
                        [1.44, 43.6],
                        [1.8, 44.0],
                        [-0.57, 44.8],
                    ],
                    [
                        [7.55, 47.56],
                        [7.6, 48.0],
                        [7.7, 48.5],
                        [7.7, 49.0],
                    ],
                    [
                        [7.0, 44.1],
                        [7.1, 43.9],
                        [7.2, 43.8],
                    ],
                ],
            },
        },
    },
    riversLineString: {
        type: 'geojson' as const,
        generateId: true,
        data: {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {
                        name: 'Loire',
                        river: 'Loire',
                        description: 'La Loire',
                    },
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            [-0.5669, 47.25],
                            [0.0833, 47.35],
                            [0.68, 47.39],
                            [1.25, 47.39],
                            [2.0, 47.2],
                            [3.1, 47.4],
                            [4.8, 47.0],
                        ],
                    },
                },
                {
                    type: 'Feature',
                    properties: {
                        name: 'Seine',
                        river: 'Seine',
                        description: 'La Seine',
                    },
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            [0.15, 49.5],
                            [0.5, 49.4],
                            [1.2, 49.0],
                            [2.35, 48.85],
                            [3.3, 48.5],
                            [3.5, 48.0],
                        ],
                    },
                },
                {
                    type: 'Feature',
                    properties: {
                        name: 'Rhône',
                        river: 'Rhône',
                        description: 'Le Rhône',
                    },
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            [6.1, 46.2],
                            [5.7, 45.9],
                            [4.83, 45.76],
                            [4.7, 44.5],
                            [4.9, 43.8],
                        ],
                    },
                },
            ],
        },
    },
    squares: {
        type: 'geojson' as const,
        generateId: true,
        data: {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: { region: 'North', name: 'Square North' },
                    geometry: {
                        type: 'Polygon',
                        coordinates: [
                            [
                                [2.1, 49.1],
                                [2.6, 49.1],
                                [2.6, 48.8],
                                [2.1, 48.8],
                                [2.1, 49.1],
                            ],
                        ],
                    },
                },
                {
                    type: 'Feature',
                    properties: { region: 'South', name: 'Square South' },
                    geometry: {
                        type: 'Polygon',
                        coordinates: [
                            [
                                [4.7, 45.85],
                                [5.1, 45.85],
                                [5.1, 45.55],
                                [4.7, 45.55],
                                [4.7, 45.85],
                            ],
                        ],
                    },
                },
            ],
        },
    },
};

export default sources;
