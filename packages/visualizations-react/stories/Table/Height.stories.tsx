import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import type { TableData, Async, TableProps } from '@opendatasoft/visualizations';
import { Table } from '../../src';
import value from './data';
import options from './options';

const meta: Meta<typeof Table> = {
    title: 'Table/Height',
    component: Table,
};
export default meta;

const data: Async<TableData> = {
    value,
    loading: false,
};

/**
 * Resizable host with an explicit height, which `fillHeight` needs to fill.
 */
const ResizableTableTemplate = ({ data: templateData, options: templateOptions }: TableProps) => (
    <div
        style={{
            resize: 'both',
            overflow: 'hidden',
            height: '440px',
            width: '720px',
            border: '1px dashed grey',
        }}
    >
        <Table data={templateData} options={templateOptions} />
    </div>
);

export const FillHeight: StoryObj<typeof ResizableTableTemplate> = {
    args: {
        data,
        options: {
            ...options,
            stickyHeader: true,
            fillHeight: true,
            title: 'fillHeight — fills its resizable parent',
        },
    },
    render: args => <ResizableTableTemplate {...args} />,
};

export const MaxHeight: StoryObj<typeof Table> = {
    args: {
        data,
        options: {
            ...options,
            stickyHeader: true,
            maxHeight: '16rem',
            title: 'maxHeight: 16rem — caps the scrollport',
        },
    },
    render: (args: TableProps) => (
        <div style={{ maxWidth: '800px' }}>
            <Table {...args} />
        </div>
    ),
};
