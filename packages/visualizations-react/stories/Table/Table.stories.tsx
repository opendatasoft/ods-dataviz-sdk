import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import type { TableData, Async, GenericRecord, TableProps } from '@opendatasoft/visualizations';

import './custom-style.css';

import { Table } from '../../src';

import value from './data';
import options, { DatasetRecord } from './options';

const meta: Meta<typeof Table> = {
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

export const Playground: StoryObj<typeof Table> = {
    args: {
        data,
        options,
    },
};

export const CustomStyle: StoryObj<typeof Table> = {
    args: {
        data,
        options: optionsWithPagination,
    },
    render: (args: TableProps) => (
        <div className="table-story--custom-style">
            <Table {...args} />
        </div>
    ),
};

export const Scroll: StoryObj<typeof Table> = {
    args: {
        data,
        options,
    },
    render: (args: TableProps) => (
        <div style={{ maxWidth: '800px' }}>
            <Table {...args} />
        </div>
    ),
};

export const TwoColumns: StoryObj<typeof Table> = {
    args: {
        data,
        options: { ...options, columns: options.columns.slice(0, 2) },
    },
};

export const Unstyled: StoryObj<typeof Table> = {
    args: {
        data,
        options: { ...options, unstyled: true },
    },
};

export const Loading: StoryObj<typeof Table> = {
    args: {
        data: fetchingData,
        options: {
            ...options,
            rowProps: {
                onClick: () => {}, // Just to have column that shouldn't have the loading indicator
            },
        },
    },
};

export const emptyState: StoryObj<typeof Table> = {
    args: {
        data: { value: [], loading: false },
        options: { ...options, emptyStateLabel: 'Neniuj registroj trovitaj...' },
    },
};

export const RtlDirection: StoryObj<typeof Table> = {
    parameters: {
        direction: 'rtl',
        chromatic: { disableSnapshot: true },
    },
    args: {
        data,
        options: optionsWithPagination,
    },
};

export const RowHoverAndClick: StoryObj<typeof Table> = {
    args: {
        data,
        options,
    },
    render: (args: TableProps) => {
        const { options: argOptions, data: argData } = args;
        const [hoveredRecord, setHovered] = useState<DatasetRecord | undefined | null>(null);
        const [lastClicked, setLastClicked] = useState<DatasetRecord | undefined | null>(null);

        const onMouseEnter = (record?: GenericRecord) => {
            setHovered(record as DatasetRecord);
        };
        const onMouseLeave = () => {
            setHovered(null);
        };
        const onClick = (record?: GenericRecord) => {
            setLastClicked(record as DatasetRecord);
        };

        return (
            <>
                <h3>Hovered</h3>
                <pre>{JSON.stringify(hoveredRecord)}</pre>
                <h3>Clicked</h3>
                <pre>{JSON.stringify(lastClicked)}</pre>
                <div style={{ maxWidth: '800px' }} className="design-system">
                    <Table
                        data={argData}
                        options={{
                            ...argOptions,
                            rowProps: { onClick, onMouseEnter, onMouseLeave },
                        }}
                    />
                </div>
                ;
            </>
        );
    },
};
