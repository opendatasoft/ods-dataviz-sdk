import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { Pagination } from '@opendatasoft/visualizations';
import { Table } from '../../src';
import './pagination.css';
import { PaginatedTemplate, PageSizeTemplate } from './PaginatedTemplates';

const meta: Meta<typeof Table> = {
    title: 'Table/Pagination',
    component: Table,
};
export default meta;

export const Paginated: StoryObj<typeof PaginatedTemplate> = {
    args: {
        current: 2,
        recordsPerPage: 3,
    },
    render: (args: Pagination) => <PaginatedTemplate {...args} />,
};

export const Longpagination: StoryObj<typeof PaginatedTemplate> = {
    args: {
        current: 1,
        recordsPerPage: 10,
    },
    render: (args: Pagination) => <PaginatedTemplate {...args} />,
};

export const Shortpagination: StoryObj<typeof PaginatedTemplate> = {
    args: {
        current: 1,
        recordsPerPage: 2,
    },
    render: (args: Pagination) => <PaginatedTemplate {...args} />,
};

export const CustomStyle: StoryObj<typeof PaginatedTemplate> = {
    args: {
        current: 2,
        recordsPerPage: 3,
        labels: {
            records: 'items',
        },
    },
    render: (args: Pagination) => (
        <div className="custom-pagination">
            <PaginatedTemplate {...args} />
        </div>
    ),
};

export const PageSize: StoryObj<typeof PageSizeTemplate> = {
    args: {
        current: 2,
        recordsPerPage: 5,
    },
    render: (args: Pagination) => <PageSizeTemplate {...args} />,
};
