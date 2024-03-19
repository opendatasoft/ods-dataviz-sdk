import React, { useState } from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { TableData, Async } from '@opendatasoft/visualizations';
import { Table } from '../../src';
import value from './data';
import { options } from './config';
import './pagination.css';

const meta: ComponentMeta<typeof Table> = {
    title: 'Table/Pagination',
    component: Table,
};
export default meta;

const data: Async<TableData> = {
    value,
    loading: false,
};

const sliceDataX = (numberPerPage: number) => (fullData: Async<TableData>, page: number) => {
    const startIndex = (page - 1) * numberPerPage;
    return fullData.value?.slice(startIndex, startIndex + numberPerPage);
};

const makeTemplate = (numberPerPage: number) => {
    const sliceData = sliceDataX(numberPerPage);
    const PaginatedTemplate: ComponentStory<typeof Table> = args => {
        const { data: rawData, options: paginatedOptions } = args;
        const { pages } = paginatedOptions;
        const { initial = 0 } = pages || {};
        const [records, setRecords] = useState(sliceData(rawData, initial || 1));
        if (paginatedOptions.pages && rawData.value) {
            paginatedOptions.pages.onChangePage = async (page: number) => {
                await setTimeout(() => {
                    setRecords(sliceData(rawData, page));
                }, 300);
            };
        }

        const paginatedData = { value: records, isLoading: false };
        return <Table data={paginatedData} options={paginatedOptions} />;
    };
    return PaginatedTemplate;
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
const PaginatedTemplate = makeTemplate(3);
export const Paginated = PaginatedTemplate.bind({});
Paginated.args = {
    data,
    options: paginatedOptions,
};

const longPagesOptions = {
    ...options,
    pages: {
        initial: 1,
        recordsPerPage: 10,
        totalRecords: value.length,
        onChangePage: () => {}, // set in template
    },
};
const LongPaginatedTemplate = makeTemplate(10);
export const LongPages = LongPaginatedTemplate.bind({});
LongPages.args = {
    data,
    options: longPagesOptions,
};

const shortPagesOptions = {
    ...options,
    pages: {
        initial: 1,
        recordsPerPage: 2,
        totalRecords: value.length,
        onChangePage: () => {}, // set in template
    },
};
const ShortPaginatedTemplate = makeTemplate(2);
export const ShortPages = ShortPaginatedTemplate.bind({});
ShortPages.args = {
    data,
    options: shortPagesOptions,
};


const StyledPaginated: ComponentStory<typeof Table> = args => (
    <div className="custom-pagination">
        <PaginatedTemplate {...args} />
    </div>
);

export const CustomStyle = StyledPaginated.bind({});
CustomStyle.args = {
    data,
    options: {
        ...paginatedOptions,
        unstyled: true,
    },
};
