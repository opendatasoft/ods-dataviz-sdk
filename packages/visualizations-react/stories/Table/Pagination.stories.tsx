import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { Pagination } from '@opendatasoft/visualizations';
import { Table } from '../../src';
import { CursorTemplate, PaginatedTemplate, PageSizeTemplate } from './PaginatedTemplates';

const meta: Meta<typeof Table> = {
    title: 'Table/Pagination',
    component: Table,
};
export default meta;

// Numbered pagination: the default pager, driven by a known total record count.
export const Numbered: StoryObj<typeof PaginatedTemplate> = {
    args: {
        current: 2,
        recordsPerPage: 5,
    },
    render: (args: Pagination) => <PaginatedTemplate {...args} />,
};

// Numbered pagination with a page-size selector.
export const PageSize: StoryObj<typeof PageSizeTemplate> = {
    args: {
        current: 1,
        recordsPerPage: 5,
    },
    render: (args: Pagination) => <PageSizeTemplate {...args} />,
};

// Cursor pagination, first page: no total, no last-page jump. Shows `‹ [1] 2 … ›`.
export const Cursor: StoryObj<typeof CursorTemplate> = {
    name: 'Cursor (no total)',
    args: {
        current: 1,
        recordsPerPage: 5,
    },
    render: args => <CursorTemplate {...args} />,
};

// Cursor pagination, a middle page with both ellipses: `‹ … 2 [3] 4 … ›`.
export const CursorMidPage: StoryObj<typeof CursorTemplate> = {
    name: 'Cursor mid-page',
    args: {
        current: 3,
        recordsPerPage: 3,
    },
    render: args => <CursorTemplate {...args} />,
};
