import type { Column, TableOptions } from '@opendatasoft/visualizations';

export const columns: Column[] = [
    {
        title: 'Title',
        key: 'title',
        dataFormat: 'short-text',
    },
    {
        title: 'Price',
        key: 'price',
        dataFormat: 'number',
        options: {
            style: 'currency',
            currency: 'EUR',
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
        options: { dateStyle: 'full' },
    },
    {
        title: 'Featured',
        key: 'isFeatured',
        dataFormat: 'boolean',
    },
    {
        title: 'Word count',
        key: 'wordCount',
        dataFormat: 'number',
    },
    {
        title: 'Reading time',
        key: 'readingTime',
        dataFormat: 'number',
    },
    {
        title: 'URL',
        key: 'url',
        dataFormat: 'url',
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
