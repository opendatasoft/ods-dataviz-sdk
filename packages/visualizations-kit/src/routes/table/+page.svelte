<script lang="ts">
import TableCard from '$lib/Table/TableCard.svelte';
import type { Column, TableOptions } from '$lib/Table/types';

const data = [
    {
        title: 'lorem ipsum blog post',
        price: 12,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
        datePublished: '2024-02-12',
        isFeatured: true,
        wordCount: 1200,
        readingTime: 5.5,
        url: 'htt:broken-url',
        geopoint: [2.357573,48.837904],
        geoshape: 'centre-val-de-loire',
    },
    {
        title: 'pellentesque nec blog post',
        price: 10.75,
        content:
            'Pellentesque nec nisl vitae massa egestas tristique. Mauris auctor consequat justo.',
        datePublished: '2024-02-13',
        isFeatured: false,
        wordCount: 800,
        readingTime: 3.8,
        url: 'https://example.com/pellentesque-nec',
        geopoint: [2.357573,48.837904],
        geoshape: 'bretagne',
    },
    {
        title: 'fusce sit amet blog post',
        price: 1100,
        content:
            'Fusce sit amet justo vitae libero finibus viverra. Sed tincidunt risus eu tortor fermentum blandit.',
        datePublished: '2024-02-14',
        isFeatured: true,
        wordCount: 1500,
        readingTime: 7.2,
        url: 'https://example.com/fusce-sit-amet',
        geopoint: [2.357573,48.837904],
        geoshape: 'nouvelle-aquitaine',
    },
    {
        title: 'vestibulum nec blog post',
        price: 0,
        content: 'Vestibulum nec ante non dui cursus fermentum. Suspendisse eu aliquam turpis.',
        datePublished: '2024-02-15',
        isFeatured: false,
        wordCount: 1000,
        readingTime: 4.5,
        url: 'https://example.com/vestibulum-nec',
        geopoint: [2.357573,48.837904],
        geoshape: 'occitanie',
    },
    {
        title: 'Cras At Blog Post',
        price: 1,
        content:
            'Cras at odio eget nisi bibendum aliquam id nec nisl. Donec ultricies nisi vel arcu rhoncus, nec pellentesque mauris aliquam.',
        datePublished: '2024-02-16',
        isFeatured: true,
        wordCount: 1300,
        readingTime: 6.0,
        url: 'https://example.com/cras-at',
        geopoint: [2.357573,48.837904],
        geoshape: 'provence-alpes-cote-d-azur',
    },
    {
        title: 'Quisque A Blog Post',
        price: 0.99,
        content:
            'Quisque a sem sit amet turpis scelerisque volutpat a et arcu. Aenean luctus venenatis ex, non accumsan odio accumsan et.',
        datePublished: '2024-02-17',
        isFeatured: false,
        wordCount: 900,
        readingTime: 4.0,
        url: 'https://example.com/quisque-a',
        geopoint: [2.357573,48.837904],
        geoshape: 'auvergne-rhone-alpes',
    },
    {
        title: 'Ut Vitae Blog Post',
        price: 10,
        content:
            'Ut vitae eros sit amet felis tincidunt tristique. Nullam non nisi nec justo rhoncus imperdiet.',
        datePublished: '2024-02-18',
        isFeatured: true,
        wordCount: 1100,
        readingTime: 5.0,
        url: 'https://example.com/ut-vitae',
        geopoint: [2.357573,48.837904],
        geoshape: 'bourgogne-franche-comte',
    },
    {
        title: 'Integer Id Blog Post',
        price: 5,
        content:
            'Integer id lectus vitae justo euismod finibus. Aliquam a sem at lectus gravida luctus.',
        datePublished: '2024-02-19',
        isFeatured: false,
        wordCount: 950,
        readingTime: 4.2,
        url: 'https://example.com/integer-id',
        geopoint: [2.357573,48.837904],
        geoshape: 'grand-est',
    },
    {
        title: 'Undefined row',
        price: undefined,
        content: null,
        datePublished: undefined,
        isFeatured: null,
        wordCount: undefined,
        readingTime: null,
        url: undefined,
        geopoint: undefined,
        geoshape: undefined,
    },
    {
        title: 'Empty row',
    },
];

const columns: Column[] = [
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
            display: (value: string) => value.startsWith('https://')  ? 'link' : 'broken link',
        },
    },
    {
        title: 'Geo point',
        key: 'geopoint',
        dataFormat: 'geo',
        options: {
            mapOptions: {
                style: 'https://demotiles.maplibre.org/style.json',
                interactive: false,
            },
            display: (v: unknown) => `longitude: ${(v as number[])[0]}, latitude: ${(v as number[])[1]}`,
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
    {
        title: 'Geo shapes',
        key: 'geoshape',
        dataFormat: 'geo',
        options: {
            mapOptions: {
                style: 'https://demotiles.maplibre.org/style.json',
                interactive: false,
                bbox: [-6.855469, 41.343825, 11.645508, 51.37178],
                zoom: 3,
            },
            display: (v : unknown) => v as string,
            sources: (v: unknown) => ({
                'table-stories' : {
                    type: 'geojson', 
                    data: `https://france-geojson.gregoiredavid.fr/repo/regions/${v}/region-${v}.geojson`
                },
            }),
            layers: () => ([{
                id:'table-stories-layer',
                source: 'table-stories',
                type: "fill",
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
</script>

<TableCard data={{ loading: false, value: data}} {...options} />
