import React, { useEffect, useState } from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type { TableProps } from '@opendatasoft/visualizations';
import { Table } from '../../src';
import value from './data';
import options from './options';
import './pagination.css';

const meta: ComponentMeta<typeof Table> = {
    title: 'Table/Pagination',
    component: Table,
};
export default meta;

const data: TableProps['data'] = {
    value,
    loading: false,
};

const sliceDataX = (numberPerPage: number) => (fullData: TableProps['data'], page: number) => {
    const startIndex = (page - 1) * numberPerPage;
    return fullData.value?.slice(startIndex, startIndex + numberPerPage);
};

const makeTemplate = (numberPerPage: number) => {
    const sliceData = sliceDataX(numberPerPage);
    const PaginatedTemplate: ComponentStory<typeof Table> = args => {
        const { data: rawData, options: paginatedOptions } = args;
        const { pagination } = paginatedOptions;
        const { initial = 0 } = pagination || {};
        const [records, setRecords] = useState(sliceData(rawData, initial || 1));
        if (paginatedOptions.pagination && rawData.value) {
            paginatedOptions.pagination.onChangePage = async (page: number) => {
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
    pagination: {
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

const longpaginationOptions = {
    ...options,
    pagination: {
        initial: 1,
        recordsPerPage: 10,
        totalRecords: value.length,
        onChangePage: () => {}, // set in template
    },
};
const LongPaginatedTemplate = makeTemplate(10);
export const Longpagination = LongPaginatedTemplate.bind({});
Longpagination.args = {
    data,
    options: longpaginationOptions,
};

const shortpaginationOptions = {
    ...options,
    pagination: {
        initial: 1,
        recordsPerPage: 2,
        totalRecords: value.length,
        onChangePage: () => {}, // set in template
    },
};
const ShortPaginatedTemplate = makeTemplate(2);
export const Shortpagination = ShortPaginatedTemplate.bind({});
Shortpagination.args = {
    data,
    options: shortpaginationOptions,
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

const pageSizeOptions = [
    { label: '2 / pages', value: 2 },
    { label: '5 / pages', value: 5 },
    { label: '10 / pages', value: 10 },
];

const PageSizeTemplate: ComponentStory<typeof Table> = args => {
    const { data: rawData, options: templateOptions } = args;
    const { pagination } = templateOptions;
    const { initial = 1 } = pagination || {};
    const [sliceData, setSliceData] = useState(sliceDataX(10));
    const [pagesSize, setPageSize] = useState<number>(10);
    const [records, setRecords] = useState(sliceData(rawData, initial || 1));

    const onPageSizeChange = (size: number) => {
        setPageSize(size);
    };
    console.log(records);
    if (templateOptions.pagination && rawData.value) {
        templateOptions.pagination.onChangePage = async (page: number) => {
            await setTimeout(() => {
                setRecords(sliceData(rawData, page));
            }, 300);
        };

        templateOptions.pagination.pageSizeSelect = {
            options: pageSizeOptions,
            onChange: onPageSizeChange,
        };
    }

    const paginatedData = { value: records, isLoading: false };
    return <Table data={paginatedData} options={templateOptions} />;
};

export const PageSize = PageSizeTemplate.bind({});
PageSize.args = {
    data,
    options: {
        ...paginatedOptions,
    },
};
