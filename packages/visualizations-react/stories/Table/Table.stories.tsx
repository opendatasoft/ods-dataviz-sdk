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
    },
    {
        title: 'Content',
        key: 'content',
    },
    {
        title: 'Published date',
        key: 'datePublished',
    },
    {
        title: 'Featured',
        key: 'isFeatured',
    },
    {
        title: 'Word count',
        key: 'wordCount',
    },
    {
        title: 'Reading time',
        key: 'readingTime',
    },
    {
        title: 'URL',
        key: 'url',
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

const Template: ComponentStory<typeof Table> = (args) => (
    <div style={{ maxWidth: '800px' }}>
        {' '}
        <Table {...args} />
    </div>
);

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

export const Unstyled = Template.bind({});
Unstyled.args = {
    data,
    options: { ...options, unstyled: true },
};
