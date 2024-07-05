import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import type { TableData, Async } from '@opendatasoft/visualizations';

import './custom-style.css';

import { Table } from '../../src';

import value from './data';
import options from './options';

const meta: ComponentMeta<typeof Table> = {
    title: 'Table/Table',
    component: Table,
};
export default meta;

const data: Async<TableData> = {
    value,
    loading: false,
};

const fetchingData: Async<TableData> = {
    value: [],
    loading: true,
};

const Template: ComponentStory<typeof Table> = args => <Table {...args} />;

const CustomStyleTemplate: ComponentStory<typeof Table> = args => (
    <div className="table-story--custom-style">
        <Table {...args} />
    </div>
);

const ScrollTemplate: ComponentStory<typeof Table> = args => (
    <div style={{ maxWidth: '800px' }}>
        <Table {...args} />
    </div>
);

const optionsWithPagination = {
    ...options,
    pagination: {
        current: 1,
        totalRecords: value.length,
        recordsPerPage: 5,
        onPageChange: () => {},
        pageSizeSelect: {
            options: [
                { label: '5 per page', value: 5 },
                { label: '10 per page', value: 10 },
            ],
            onChange: () => {},
        },
    },
};

export const Playground = Template.bind({});
Playground.args = {
    data,
    options,
};

export const CustomStyle = CustomStyleTemplate.bind({});
CustomStyle.args = {
    data,
    options: optionsWithPagination,
};

export const Scroll = ScrollTemplate.bind({});
Scroll.args = {
    data,
    options,
};

export const TwoColumns = Template.bind({});
TwoColumns.args = {
    data,
    options: { ...options, columns: options.columns.slice(0, 2) },
};

export const Unstyled = Template.bind({});
Unstyled.args = {
    data,
    options: { ...options, unstyled: true },
};

export const Loading = Template.bind({});
Loading.args = {
    data: fetchingData,
    options,
};

export const emptyState = Template.bind({});
emptyState.args = {
    data: { value: [], loading: false },
    options: { ...options, emptyStateLabel: 'Neniuj registroj trovitaj...' },
};

export const RtlDirection = Template.bind({});
RtlDirection.parameters = { direction: 'rtl' };
RtlDirection.args = {
    data,
    options: optionsWithPagination,
};
