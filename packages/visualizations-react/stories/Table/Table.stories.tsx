import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import type {
    TableData,
    Async,
    GenericRecord,
    TableProps,
    Pagination,
} from '@opendatasoft/visualizations';

import './custom-style.css';

import { Table } from '../../src';

import value from './data';
import options, { DatasetRecord } from './options';
import { PaginatedTemplate, PageSizeTemplate } from './PaginatedTemplates';

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

export const Playground: StoryObj<typeof Table> = {
    args: {
        data,
        options,
    },
};

// Pagination is host-sliced: the Table renders whatever rows it is given, so a story that
// wants to paginate must drive it from a stateful template (PaginatedTemplates) rather than
// pass the full dataset with a no-op onPageChange. PageSizeTemplate exercises the numbered
// pager and the page-size select that custom-style.css restyles below.
export const CustomStyle: StoryObj<typeof PageSizeTemplate> = {
    args: {
        current: 1,
        recordsPerPage: 5,
    },
    render: (args: Pagination) => (
        <div className="table-story--custom-style">
            <PageSizeTemplate {...args} />
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

export const RtlDirection: StoryObj<typeof PaginatedTemplate> = {
    parameters: {
        direction: 'rtl',
        chromatic: { disableSnapshot: true },
    },
    args: {
        current: 1,
        recordsPerPage: 5,
    },
    render: (args: Pagination) => <PaginatedTemplate {...args} />,
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
