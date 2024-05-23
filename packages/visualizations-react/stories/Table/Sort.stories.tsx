import React, { useState, useEffect } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import type { TableData, Async, ColumnSortValues, DataFrame } from '@opendatasoft/visualizations';
import { ColumnSort } from '@opendatasoft/visualizations';
import { Table } from '../../src';
import value from './data';
import options from './options';
import { fetchData } from './utils';

import './custom-style.css';

const meta: ComponentMeta<typeof Table> = {
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

const Template: ComponentStory<typeof Table> = args => {
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
};

export const Sort = Template.bind({});
Sort.args = {
    data,
    options: {
        ...options,
    },
};

const ColoredTemplate: ComponentStory<typeof Table> = args => (
    <div className="design-system">
        <Template {...args} />
    </div>
);

export const ColorSort = ColoredTemplate.bind({});
ColorSort.args = {
    data,
    options: {
        ...options,
    },
};
