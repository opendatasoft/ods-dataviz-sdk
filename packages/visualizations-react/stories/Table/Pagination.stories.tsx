import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Table } from '../../src';
import './pagination.css';
import { PaginatedTemplate, PageSizeTemplate } from './PaginatedTemplates';

const meta: ComponentMeta<typeof Table> = {
    title: 'Table/Pagination',
    component: Table,
};
export default meta;

const PaginatedTable: ComponentStory<typeof PaginatedTemplate> = args => (
    <PaginatedTemplate {...args} />
);
export const Paginated = PaginatedTable.bind({});
Paginated.args = {
    current: 2,
    recordsPerPage: 3,
};

export const Longpagination = PaginatedTable.bind({});
Longpagination.args = {
    current: 1,
    recordsPerPage: 10,
};
export const Shortpagination = PaginatedTable.bind({});
Shortpagination.args = {
    current: 1,
    recordsPerPage: 2,
};

const StyledPaginated: ComponentStory<typeof PaginatedTemplate> = args => (
    <div className="custom-pagination">
        <PaginatedTemplate {...args} />
    </div>
);

export const CustomStyle = StyledPaginated.bind({});
CustomStyle.args = {
    current: 2,
    recordsPerPage: 3,
    labels: {
        records: 'items',
    },
};

const PageSizeTable: ComponentStory<typeof PageSizeTemplate> = args => (
    <PageSizeTemplate {...args} />
);
export const PageSize = PageSizeTable.bind({});
PageSize.args = {
    current: 2,
    recordsPerPage: 5,
};
