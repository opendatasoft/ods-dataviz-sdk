import type { Column, TableOptions } from '@opendatasoft/visualizations';

export type DatasetRecord = {
    title: string;
    price: number;
    content: string;
    datePublished: string;
    isFeatured: boolean;
    wordCount: number;
    readingTime: number;
    url: string;
    geopoint: [number, number];
    region: string;
    geoshape: string;
    image: {
        thumbnail: boolean;
        url: string;
        filename: string;
    };
};

export const columns: Column<DatasetRecord>[] = [
    {
        title: 'Title',
        key: 'title',
        dataFormat: 'short-text',
        options: {
            valueToLabel: (v: string) => v.toUpperCase(),
        },
    },
    {
        title: 'Price',
        key: 'price',
        dataFormat: 'number',
        options: {
            intl: {
                style: 'currency',
                currency: 'EUR',
            },
        },
    },
    {
        title: 'Content',
        key: 'content',
        dataFormat: 'long-text',
    },
    {
        title: 'Published date',
        key: 'datePublished',
        dataFormat: 'date',
        options: {
            valueToLabel: (v: string) => `${v} 🗓️`,
            intl: {
                dateStyle: 'full',
            },
        },
    },
    {
        title: 'Featured',
        key: 'isFeatured',
        dataFormat: 'boolean',
        options: {
            valueToLabel: (v: boolean) => (v ? 'αληθές' : 'ψευδές'),
        },
    },
    {
        title: 'Word count',
        key: 'wordCount',
        dataFormat: 'number',
        options: {
            valueToLabel: (v: string) => `${v} words`,
        },
    },
    {
        title: 'Reading time',
        key: 'readingTime',
        dataFormat: 'number',
        options: {
            intl: {
                unit: 'minute',
                style: 'unit',
            },
        },
    },
    {
        title: 'URL',
        key: 'url',
        dataFormat: 'url',
        options: {
            valueToLabel: (v: string) => (v.startsWith('https://') ? 'link' : 'broken link'),
        },
    },
    {
        title: 'Image',
        key: 'image',
        dataFormat: 'image',
        options: r => ({
            value: r.image.url,
            valueToLabel: () => r.image.filename,
            alt: r.image.filename,
        }),
    },
    {
        title: 'Geo point',
        key: 'geopoint',
        dataFormat: 'geo',
        accessor: r => {
            const coordinates = r.geopoint;

            return {
                sources: {
                    'table-stories': {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: [
                                {
                                    id: 1,
                                    type: 'Feature',
                                    geometry: {
                                        type: 'Point',
                                        coordinates,
                                    },
                                },
                            ],
                        },
                    },
                },
                layers: [
                    {
                        id: 'table-stories-layer',
                        source: 'table-stories',
                        type: 'circle',
                        color: 'black',
                        borderColor: 'white',
                    },
                ],
            };
        },
        options: r => ({
            mapOptions: {
                style: 'https://demotiles.maplibre.org/style.json',
                interactive: false,
            },
            valueToLabel: () =>
                r?.geopoint && `longitude: ${r.geopoint[0]}, latitude: ${r.geopoint[1]}`,
        }),
    },
    {
        title: 'Geo shapes',
        key: 'geoshape',
        dataFormat: 'geo',
        accessor: r => ({
            sources: {
                'table-stories': {
                    type: 'geojson',
                    data: r.geoshape,
                },
            },
            layers: [
                {
                    id: 'table-stories-layer',
                    source: 'table-stories',
                    type: 'fill',
                    color: 'black',
                    borderColor: 'white',
                },
            ],
        }),
        options: r => ({
            mapOptions: {
                style: 'https://demotiles.maplibre.org/style.json',
                interactive: false,
                bbox: [-6.855469, 41.343825, 11.645508, 51.37178],
                zoom: 3,
            },
            valueToLabel: () => r.region,
        }),
    },
];

const options: TableOptions = {
    columns,
    title: 'My table',
    subtitle: 'and a subtitle...',
    description: 'An aria description',
    source: {
        href: '',
    },
    locale: 'fr',
};

export default options;
