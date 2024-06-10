import type { Column, TableOptions } from '@opendatasoft/visualizations';

export const columns: Column[] = [
    {
        title: 'Title',
        key: 'title',
        dataFormat: 'short-text',
        options: {
            display: (title: string) => `${title.toUpperCase()}`,
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
            display: (date: string) => `${date} 🗓️`,
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
            display: (bool: boolean) => (bool ? 'αληθές' : 'ψευδές'),
        },
    },
    {
        title: 'Word count',
        key: 'wordCount',
        dataFormat: 'number',
        options: {
            display: (v: string) => `${v} words`,
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
            display: () => 'link',
        },
    },
    {
        title: 'Geo point',
        key: 'geopoint',
        dataFormat: 'geo',
        options: {
            display: (v: [number, number]) => `longitude: ${v[0]}, latitude: ${v[1]}`,
            mapOptions: {
                style: 'https://demotiles.maplibre.org/style.json',
            },
            sources: (coordinates: unknown) => ({
                'table-stories' : {
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
                    }
                },
            }),
            layers: () => ([{
                id:'table-stories-layer',
                source: 'table-stories',
                type: 'circle',
                color: 'black',
                borderColor: 'white',
            }])
        },
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
