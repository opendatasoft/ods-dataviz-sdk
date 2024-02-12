import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Column, TableOptions, TableData, Async, Theme } from '@opendatasoft/visualizations';

import { Table } from '../../src';

import value from './data';

const theme: Required<Theme> = {
    textColor: '#000000',
    borderColor: '#fcd4cf',
    header: {
        textColor: '#ffffff',
        backgroundColor: '#fd635d',
        borderColor: '#f94346',
    },
    dataRow: {
        activeBackgroundColor: '#f9aea4',
    },
};

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

export const CustomTheme = Template.bind({});
CustomTheme.args = {
    data,
    options: { ...options, theme },
};
