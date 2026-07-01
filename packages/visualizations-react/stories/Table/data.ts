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

// Neutral, readable demo rows. Plain English, plausible blog-post records that exercise
// every column data format (text, currency, long-text, date, boolean, url, geo, image).
// Sixteen full rows so the cursor stories can show real pages and both ellipses, plus two
// edge rows (missing and empty values) at the end to check empty-value rendering.
const regions = [
    'Centre Val de Loire',
    'Bretagne',
    'Nouvelle Aquitaine',
    'Occitanie',
    'PACA',
    'Auvergne Rhône-Alpes',
    'Bourgogne Franche-Comté',
    'Grand Est',
    'Île-de-France',
    'Normandie',
    'Hauts-de-France',
    'Pays de la Loire',
    'Corse',
    'Centre Val de Loire',
    'Bretagne',
    'Occitanie',
];

const regionSlugs: Record<string, string> = {
    'Centre Val de Loire': 'centre-val-de-loire',
    Bretagne: 'bretagne',
    'Nouvelle Aquitaine': 'nouvelle-aquitaine',
    Occitanie: 'occitanie',
    PACA: 'provence-alpes-cote-d-azur',
    'Auvergne Rhône-Alpes': 'auvergne-rhone-alpes',
    'Bourgogne Franche-Comté': 'bourgogne-franche-comte',
    'Grand Est': 'grand-est',
    'Île-de-France': 'ile-de-france',
    Normandie: 'normandie',
    'Hauts-de-France': 'hauts-de-france',
    'Pays de la Loire': 'pays-de-la-loire',
    Corse: 'corse',
};

const titles = [
    'Getting started with open data',
    'Building your first dashboard',
    'How to publish a dataset',
    'Designing clear data visualizations',
    'Working with the Explore API',
    'A guide to data quality',
    'Mapping records on a chart',
    'Sharing reusable visualizations',
    'Understanding aggregations',
    'Filtering and faceting basics',
    'Connecting external data sources',
    'Automating your data pipeline',
    'Best practices for table layouts',
    'Exporting data the right way',
    'Tracking usage with analytics',
    'Securing access to your portal',
];

const summaries = [
    'A short introduction to open data and why it matters for everyone.',
    'Step-by-step instructions to assemble a dashboard from scratch.',
    'What you need to prepare before publishing a dataset to your portal.',
    'Simple rules to make any chart easier to read and understand.',
    'An overview of querying records programmatically with the API.',
    'Practical checks to keep your datasets clean and trustworthy.',
    'How to plot geographic records and read them at a glance.',
    'Package a visualization once and reuse it across several pages.',
    'When to group records and how the common functions behave.',
    'The essentials of narrowing results down with filters and facets.',
    'Pull data in from warehouses, files and third-party services.',
    'Schedule ingestion so your data stays fresh without manual work.',
    'Lay out columns so a wide table stays comfortable to scan.',
    'Pick the right format and file name when exporting your data.',
    'Measure how people use your portal and act on the numbers.',
    'Set up roles and permissions to control who sees what.',
];

const fullRows = titles.map((title, i) => ({
    title,
    price: [12, 10.75, 24, 0, 8.5, 15, 6.9, 30, 5, 19.99, 42, 0.99, 11, 27.5, 3, 50][i],
    content: summaries[i],
    datePublished: `2024-02-${String(12 + i).padStart(2, '0')}`,
    isFeatured: i % 3 === 0,
    wordCount: 800 + i * 50,
    readingTime: 3 + (i % 6) * 0.6,
    url:
        i === 0
            ? 'htt:broken-url'
            : `https://example.com/${title.toLowerCase().replace(/[^a-z]+/g, '-')}`,
    geopoint: [2.357573, 48.837904] as [number, number],
    region: regions[i],
    geoshape: `https://france-geojson.gregoiredavid.fr/repo/regions/${
        regionSlugs[regions[i]]
    }/region-${regionSlugs[regions[i]]}.geojson`,
    image,
}));

export default [
    ...fullRows,
    {
        title: 'Row with missing values',
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
