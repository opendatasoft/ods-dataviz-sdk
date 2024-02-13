import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Column, TableOptions, TableData, Async } from '@opendatasoft/visualizations';

import { Table } from '../../src';

import value from './data';

const meta: ComponentMeta<typeof Table> = {
    title: 'Table/Table',
    component: Table,
};
export default meta;

const data: Async<TableData> = {
    value,
    loading: false,
};

const columns: Column[] = [
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
};

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Playground = Template.bind({});
Playground.args = {
    data,
    options,
};

const CustomStyleTemplate: ComponentStory<typeof Table> = (args) => (
    <div className="table-story--custom-style">
        <Table {...args} />
    </div>
);
export const CustomStyle = CustomStyleTemplate.bind({});
CustomStyle.args = {
    data,
    options,
};

const ScrollTemplate: ComponentStory<typeof Table> = (args) => (
    <div style={{ maxWidth: '800px' }}>
        <Table {...args} />
    </div>
);

export const Scroll = ScrollTemplate.bind({});
Scroll.args = {
    data,
    options,
};

export const Unstyled = Template.bind({});
Unstyled.args = {
    data,
    options: { ...options, unstyled: true },
};
