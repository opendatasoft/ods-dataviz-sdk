import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DataFrame, Column, TableOptions, Async, DATA_FORMATS } from '@opendatasoft/visualizations';
import { Table } from '../../src';
import type { Props } from '../../src';

import './my-class.css';

const meta: ComponentMeta<typeof Table> = {
    title: 'table',
};
export default meta;

const value: DataFrame = [
    {
        name: 'Mohn',
        address: 'New York',
        number: 10,
    },
    {
        name: 'Kohn',
        address: '1 street New York',
        number: 10,
    },
    {
        name: 'John',
        address: '1 street 789000 NewYork',
        number: 10,
    },
    {
        name: 'Lohn',
        address: '1 street 789000 NewYork USofA',
        number: 10,
    },
];

const longValue: DataFrame = Array.from(Array(50).keys()).map((i: number) => ({
    name: `John ${i}`,
    address: `${i} street, New York`,
    number: i * i,
}));

const data = {
    value,
    isLoading: false,
};
const longData = {
    value: longValue,
    isLoading: false,
};

const sortName = (a: any, b: any) => (a.name < b.name ? -1 : 1);
const sortAddress = (a: any, b: any) => a.address.length - b.address.length;

const columns: Column[] = [
    {
        title: 'Name',
        key: 'name',
        dataFormat: DATA_FORMATS.shortText,
    },
    {
        title: 'Address',
        key: 'address',
        dataFormat: DATA_FORMATS.longText,

    },
    {
        title: 'Number',
        key: 'number',
        dataFormat: DATA_FORMATS.integer,
    },
];

const fixedColumns: Column[] = [
    {
        title: 'Name',
        key: 'name',
        dataFormat: DATA_FORMATS.shortText,
        width: 200,
        fixed: 'left',
    },
    {
        title: 'Address',
        key: 'address',
        dataFormat: DATA_FORMATS.longText,
        width: 200,
        fixed: 'left',
    },
    {
        title: 'Number',
        key: 'number',
        dataFormat: DATA_FORMATS.integer,
        width: 1000,
    },
];

const Template: ComponentStory<typeof Table> = args => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
    data,
    options: {
        columns,
    },
} as Props<DataFrame, TableOptions>;

const StyledTemplate: ComponentStory<typeof Table> = args => (
    <div className="myClass">
        <Table {...args} />;
    </div>
);

export const Styled = StyledTemplate.bind({});
Styled.args = {
    data,
    options: {
        columns,
    },
};

export const DefaultSorted = Template.bind({});
DefaultSorted.args = {
    data,
    options: {
        columns,
        defaultSortKey: 'name',
    },
} as Props<DataFrame, TableOptions>;

export const Sortable = Template.bind({});
Sortable.args = {
    data,
    options: {
        columns: sortableColumns,
    },
} as Props<DataFrame, TableOptions>;

export const FixedHeader = Template.bind({});
FixedHeader.args = {
    data: longData,
    options: {
        fixedHeader: true,
        columns,
    },
} as Props<DataFrame, TableOptions>;

export const FixedColumns = Template.bind({});
FixedColumns.args = {
    data,
    options: {
        columns: fixedColumns,
    },
} as Props<DataFrame, TableOptions>;

const sliceData5 = (fullData: Async<DataFrame>, page: number) => {
    const startIndex = page *5;
    return fullData.value?.slice(startIndex, startIndex + 5);
};
const PaginatedTemplate: ComponentStory<typeof Table> = (args) => {
    const { data: rawData, options } = args;
    const { initial } = options.pages || {};
    const [records, setRecords] = useState(sliceData5(rawData, initial || 0));

    if (options.pages && rawData.value) {
        options.pages.setPage = (page: number) => {
            setRecords(sliceData5(rawData, page));
        };
    }

    const paginatedData = { value: records, isLoading: false };
    return <Table data={paginatedData} options={options} />;
};

export const Paginated = PaginatedTemplate.bind({});
Paginated.args = {
    data: longData,
    options: {
        fixedHeader: true,
        columns,
        pages: {
            initial: 3,
            total: 10,
            setPage: () => {} // set in template
        },
    },
} as Props<DataFrame, TableOptions>;

