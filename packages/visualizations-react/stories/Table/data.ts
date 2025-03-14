const image = {
    exif_orientation: 1,
    thumbnail: true,
    filename: 'ods.svg',
    format: 'PNG',
    width: 922,
    id: 'fe46e6580de0aac98eca3d5c928f11cb',
    height: 918,
    color_summary: [
        'rgba(185, 149, 111, 1.00)',
        'rgba(206, 163, 117, 1.00)',
        'rgba(194, 157, 119, 1.00)',
    ],
    url: 'https://www.opendatasoft.com/wp-content/uploads/2022/12/logo-opendatasoft.svg',
};

export default [
    {
        title: 'lorem ipsum blog post',
        price: 12,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
        datePublished: '2024-02-12',
        isFeatured: true,
        wordCount: 1200,
        readingTime: 5.5,
        url: 'htt:broken-url',
        geopoint: [2.357573, 48.837904],
        region: 'Centre Val de Loire',
        geoshape:
            'https://france-geojson.gregoiredavid.fr/repo/regions/centre-val-de-loire/region-centre-val-de-loire.geojson',
        image,
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
        geopoint: [2.357573, 48.837904],
        region: 'Bretagne',
        geoshape:
            'https://france-geojson.gregoiredavid.fr/repo/regions/bretagne/region-bretagne.geojson',
        image,
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
        geopoint: [2.357573, 48.837904],
        region: 'Nouvelle Aquitaine',
        geoshape:
            'https://france-geojson.gregoiredavid.fr/repo/regions/nouvelle-aquitaine/region-nouvelle-aquitaine.geojson',
        image,
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
        geopoint: [2.357573, 48.837904],
        region: 'Occitanie',
        geoshape:
            'https://france-geojson.gregoiredavid.fr/repo/regions/occitanie/region-occitanie.geojson',
        image,
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
        geopoint: [2.357573, 48.837904],
        region: 'PACA',
        geoshape:
            'https://france-geojson.gregoiredavid.fr/repo/regions/provence-alpes-cote-d-azur/region-provence-alpes-cote-d-azur.geojson',
        image,
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
        geopoint: [2.357573, 48.837904],
        region: 'Auvergnes Rhône-Alpes',
        geoshape:
            'https://france-geojson.gregoiredavid.fr/repo/regions/auvergne-rhone-alpes/region-auvergne-rhone-alpes.geojson',
        image,
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
        geopoint: [2.357573, 48.837904],
        region: 'Bourgogne Franche-Comté',
        geoshape:
            'https://france-geojson.gregoiredavid.fr/repo/regions/bourgogne-franche-comte/region-bourgogne-franche-comte.geojson',
        image,
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
        geopoint: [2.357573, 48.837904],
        region: 'Grand Est',
        geoshape:
            'https://france-geojson.gregoiredavid.fr/repo/regions/grand-est/region-grand-est.geojson',
        image,
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
        image: undefined,
    },
    {
        title: 'Empty row',
    },
];
