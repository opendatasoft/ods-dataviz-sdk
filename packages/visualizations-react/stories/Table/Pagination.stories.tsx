import React, { useEffect, useState } from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type { TableProps, DataFrame } from '@opendatasoft/visualizations';
import { Table } from '../../src';
import value from './data';
import options from './options';
import { fetchData } from './utils';

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

const PaginatedTemplate: ComponentStory<typeof Table> = args => {
    const { data: rawData, options: paginatedOptions } = args;
    const { pagination } = paginatedOptions;
    const { current = 1, recordsPerPage } = pagination || {};
    const [records, setRecords] = useState<DataFrame>([]);
    const [page, setPage] = useState(current);
    if (paginatedOptions.pagination && rawData.value) {
        paginatedOptions.pagination.onPageChange = (newPage: number) => {
            setPage(newPage);
        };
    }

    useEffect(() => {
        (async () => {
            const newRecords = await fetchData({
                size: recordsPerPage,
                page,
                data: value,
            });
            setRecords(newRecords);
        })();
    }, [recordsPerPage, page, setRecords]);

    const paginatedData = { value: records, isLoading: false };
    const stateFulOptions = {
        ...paginatedOptions,
        pagination: { ...paginatedOptions.pagination, current: page },
    };
    return <Table data={paginatedData} options={stateFulOptions} />;
};

export const Paginated = PaginatedTemplate.bind({});
Paginated.args = {
    data,
    options: {
        ...options,
        pagination: {
            current: 2,
            recordsPerPage: 3,
            totalRecords: value.length,
            onPageChange: () => {}, // set in template
        },
    },
};

export const Longpagination = PaginatedTemplate.bind({});
Longpagination.args = {
    data,
    options: {
        ...options,
        pagination: {
            current: 1,
            recordsPerPage: 10,
            totalRecords: value.length,
            onPageChange: () => {}, // set in template
        },
    },
};

export const Shortpagination = PaginatedTemplate.bind({});
Shortpagination.args = {
    data,
    options: {
        ...options,
        pagination: {
            current: 1,
            recordsPerPage: 2,
            totalRecords: value.length,
            onPageChange: () => {}, // set in template
        },
    },
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
        ...options,
        pagination: {
            current: 2,
            recordsPerPage: 3,
            totalRecords: value.length,
            onPageChange: () => {}, // set in template
        },
        unstyled: true,
    },
};

const PageSizeTemplate: ComponentStory<typeof Table> = args => {
    const { data: rawData, options: paginatedOptions } = args;
    const { pagination } = paginatedOptions;
    const { current = 1, recordsPerPage = 10 } = pagination || {};
    const [records, setRecords] = useState<DataFrame>();
    const [pageSize, setPageSize] = useState(recordsPerPage);
    const [page, setPage] = useState(current);

    if (paginatedOptions.pagination && rawData.value) {
        paginatedOptions.pagination.onPageChange = (newPage: number) => {
            setPage(newPage);
        };
    }

    if (paginatedOptions.pagination?.pageSizeSelect) {
        paginatedOptions.pagination.pageSizeSelect.onChange = (newSize: number) => {
            setPageSize(newSize);
            setPage(1);
        };
    }

    useEffect(() => {
        (async () => {
            const newRecords = await fetchData({
                size: pageSize,
                page,
                data: value,
            });
            setRecords(newRecords);
        })();
    }, [recordsPerPage, page, pageSize, setRecords]);

    const paginatedData = { value: records, isLoading: false };
    const stateFulOptions = {
        ...paginatedOptions,
        pagination: {
            ...paginatedOptions.pagination,
            current: page,
            recordsPerPage: pageSize,
        },
    };
    return <Table data={paginatedData} options={stateFulOptions} />;
};

export const PageSize = PageSizeTemplate.bind({});
PageSize.args = {
    data,
    options: {
        ...options,
        pagination: {
            current: 2,
            recordsPerPage: 5,
            totalRecords: value.length,
            onPageChange: () => {}, //
            pageSizeSelect: {
                options: [
                    { label: '2 / pages', value: 2 },
                    { label: '5 / pages', value: 5 },
                    { label: '10 / pages', value: 10 },
                ],
                onChange: () => {}, // stateful, defined in template
            },
        },
    },
};

/* This template will fail to catch a new page and returns previous data, page and pageSize
simulating e.g. an API call fail.
The select should stay on it's previous value, not the clicked one.
*/
const PageSizeFailTemplate: ComponentStory<typeof Table> = args => {
    const { data: rawData, options: paginatedOptions } = args;
    const { pagination } = paginatedOptions;
    const { current = 1, recordsPerPage = 10 } = pagination || {};
    const [records, setRecords] = useState<DataFrame>();
    const [pageSize, setPageSize] = useState(recordsPerPage);
    const [page, setPage] = useState(current);

    if (paginatedOptions.pagination && rawData.value) {
        paginatedOptions.pagination.onPageChange = () => {
            /* Forces 2 no matter what is clicked */
            setPage(2);
        };
    }

    if (paginatedOptions.pagination?.pageSizeSelect) {
        paginatedOptions.pagination.pageSizeSelect.onChange = () => {
            /* Forces 5 no matter the selected value */
            setPageSize(5);
        };
    }

    useEffect(() => {
        (async () => {
            const newRecords = await fetchData({
                size: pageSize,
                page,
                data: value,
            });
            setRecords(newRecords);
        })();
    }, [recordsPerPage, page, pageSize, setRecords]);

    const paginatedData = { value: records, isLoading: false };
    const stateFulOptions = {
        ...paginatedOptions,
        pagination: {
            ...paginatedOptions.pagination,
            current: page,
            recordsPerPage: pageSize,
        },
    };
    return <Table data={paginatedData} options={stateFulOptions} />;
};
export const PageSizeFail = PageSizeFailTemplate.bind({});
PageSizeFail.args = {
    data,
    options: {
        ...options,
        title: 'I should fail and stay on page 2 and size 5',
        subtitle: 'click as hard as you want…',
        pagination: {
            current: 2,
            recordsPerPage: 5,
            totalRecords: value.length,
            onPageChange: () => {}, //
            pageSizeSelect: {
                options: [
                    { label: '2 / pages', value: 2 },
                    { label: '5 / pages', value: 5 },
                    { label: '10 / pages', value: 10 },
                ],
                onChange: () => {}, // stateful, defined in template
            },
        },
    },
};
