import React, { useState } from 'react';
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

const Template: ComponentStory<typeof Table> = args => <Table {...args} />;

export const Playground = Template.bind({});
Playground.args = {
    data,
    options,
};

const CustomStyleTemplate: ComponentStory<typeof Table> = args => (
    <div className="table-story--custom-style">
        <Table {...args} />
    </div>
);
export const CustomStyle = CustomStyleTemplate.bind({});
CustomStyle.args = {
    data,
    options,
};

const ScrollTemplate: ComponentStory<typeof Table> = args => (
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

const sliceData3 = (fullData: Async<TableData>, page: number) => {
    const startIndex = page * 3;
    return fullData.value?.slice(startIndex, startIndex + 3);
};

const PaginatedTemplate: ComponentStory<typeof Table> = args => {
    const { data: rawData, options: paginatedOptions } = args;
    const { pages } = paginatedOptions;
    const { initial = 0 } = pages || {};
    const [records, setRecords] = useState(sliceData3(rawData, initial || 0));

    if (paginatedOptions.pages && rawData.value) {
        paginatedOptions.pages.onChangePage = async (page: number) => {
            await setTimeout(() => {
                setRecords(sliceData3(rawData, page));
            }, 1000);
        };
    }

    const paginatedData = { value: records, isLoading: false };
    return <Table data={paginatedData} options={paginatedOptions} />;
};

const paginatedOptions = {
    ...options,
    pages: {
        initial: 2,
        recordsPerPage: 3,
        totalRecords: value.length,
        onChangePage: () => {}, // set in template
    },
};

export const Paginated = PaginatedTemplate.bind({});
Paginated.args = {
    data,
    options: paginatedOptions,
};
