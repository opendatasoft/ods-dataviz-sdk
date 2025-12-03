import React, { useState, useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import type {
    TableData,
    Async,
    ColumnSortValues,
    DataFrame,
    TableProps,
} from '@opendatasoft/visualizations';
import { ColumnSort } from '@opendatasoft/visualizations';
import { Table } from '../../src';
import value from './data';
import options from './options';
import { fetchData } from './utils';

import './custom-style.css';

const meta: Meta<typeof Table> = {
    title: 'Table/Sort',
    component: Table,
};
export default meta;

const data: Async<TableData> = {
    value,
    loading: false,
};

const sortColumn = (sort: [string, ColumnSortValues], key: string) =>
    sort[0] === key && sort[1] === 'ASC' ? 'DESC' : 'ASC';

export const Sort: StoryObj<typeof Table> = {
    args: {
        data,
        options: {
            ...options,
        },
    },
    render: (args: TableProps) => {
        const { options: unsortedOptions } = args;
        const [sort, setSort] = useState<[string, ColumnSortValues]>(['title', ColumnSort.asc]);
        const [records, setRecords] = useState<DataFrame>();

        useEffect(() => {
            (async () => {
                const newRecords = await fetchData({
                    size: 5,
                    data: value,
                    sort,
                    page: 1,
                });
                setRecords(newRecords);
            })();
        }, [setRecords, sort]);

        const sortedData = { value: records, isLoading: false };

        const sortableColumns = unsortedOptions.columns.map((col, i) => ({
            ...col,
            sorted: sort[0] === col.key ? sort[1] : undefined,
            // cheap way to have some not sortable
            onClick: i < 2 ? () => setSort([col.key, sortColumn(sort, col.key)]) : undefined,
        }));

        const sortedOptions = {
            ...options,
            columns: sortableColumns,
        };
        return <Table data={sortedData} options={sortedOptions} />;
    },
};

export const ColorSort: StoryObj<typeof Table> = {
    args: {
        data,
        options: {
            ...options,
        },
    },
    render: (args: TableProps) => {
        const { options: unsortedOptions } = args;
        const [sort, setSort] = useState<[string, ColumnSortValues]>(['title', ColumnSort.asc]);
        const [records, setRecords] = useState<DataFrame>();

        useEffect(() => {
            (async () => {
                const newRecords = await fetchData({
                    size: 5,
                    data: value,
                    sort,
                    page: 1,
                });
                setRecords(newRecords);
            })();
        }, [setRecords, sort]);

        const sortedData = { value: records, isLoading: false };

        const sortableColumns = unsortedOptions.columns.map((col, i) => ({
            ...col,
            sorted: sort[0] === col.key ? sort[1] : undefined,
            // cheap way to have some not sortable
            onClick: i < 2 ? () => setSort([col.key, sortColumn(sort, col.key)]) : undefined,
        }));

        const sortedOptions = {
            ...options,
            columns: sortableColumns,
        };
        return (
            <div className="design-system">
                <Table data={sortedData} options={sortedOptions} />
            </div>
        );
    },
};
