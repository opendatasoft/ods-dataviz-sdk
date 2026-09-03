import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import type { TableData, Async, TableProps, Pagination } from '@opendatasoft/visualizations';
import { Table } from '../../src';
import value from './data';
import options from './options';
import { usePaginatedData } from './PaginatedTemplates';

const meta: Meta<typeof Table> = {
    title: 'Table/StickyHeader',
    component: Table,
};
export default meta;

const data: Async<TableData> = {
    value,
    loading: false,
};

const STORY_SCROLLPORT_HEIGHT = '16rem';

const frameStyle: React.CSSProperties = { maxWidth: '800px' };

// The toggle holds state, so this story renders a template rather than calling hooks in `render`.
const StickyHeaderToggleTemplate = ({
    data: templateData,
    options: templateOptions,
}: TableProps) => {
    const [isStickyHeaderEnabled, setIsStickyHeaderEnabled] = useState(
        Boolean(templateOptions.stickyHeader)
    );

    return (
        <>
            <div style={{ marginBottom: '20px' }}>
                <h3>Sticky header (`options.stickyHeader`)</h3>
                <p style={{ maxWidth: '42rem', marginBottom: '0.75rem' }}>
                    Scroll inside the table — the header row stays pinned at the top. Requires{' '}
                    <code>maxHeight</code> to be set too, otherwise the scrollport is unbounded and
                    the header has no visible effect.
                </p>
                <label htmlFor="sticky-header-toggle">
                    <input
                        id="sticky-header-toggle"
                        type="checkbox"
                        checked={isStickyHeaderEnabled}
                        onChange={e => setIsStickyHeaderEnabled(e.target.checked)}
                    />{' '}
                    Sticky header
                </label>
            </div>
            <div className="sticky-header-story-frame" style={frameStyle}>
                <Table
                    data={templateData}
                    options={{
                        ...templateOptions,
                        stickyHeader: isStickyHeaderEnabled,
                        maxHeight: STORY_SCROLLPORT_HEIGHT,
                    }}
                />
            </div>
        </>
    );
};

export const StickyHeader: StoryObj<typeof StickyHeaderToggleTemplate> = {
    args: {
        data,
        options: { ...options, stickyHeader: true, maxHeight: STORY_SCROLLPORT_HEIGHT },
    },
    render: args => <StickyHeaderToggleTemplate {...args} />,
};

// Pagination is stateful, so this story renders a template and types against it rather than
// against Table, whose props are not the pagination args driving the story.
const PaginatedStickyHeaderTemplate = (pagination: Pagination) => {
    const { current = 1, recordsPerPage = 4 } = pagination;
    const { paginatedData, page, pageSize, setPage } = usePaginatedData({
        current,
        recordsPerPage,
    });

    return (
        <>
            <p style={{ maxWidth: '42rem', marginBottom: '0.75rem' }}>
                Scroll inside the table, then change page. The header stays pinned while rows
                update.
            </p>
            <div className="sticky-header-paginated-frame" style={frameStyle}>
                <Table
                    data={paginatedData}
                    options={{
                        ...options,
                        stickyHeader: true,
                        maxHeight: STORY_SCROLLPORT_HEIGHT,
                        pagination: {
                            current: page,
                            recordsPerPage: pageSize,
                            totalRecords: value.length,
                            onPageChange: setPage,
                        },
                    }}
                />
            </div>
        </>
    );
};

export const StickyHeaderWithPagination: StoryObj<typeof PaginatedStickyHeaderTemplate> = {
    args: {
        current: 1,
        recordsPerPage: 4,
    },
    render: args => <PaginatedStickyHeaderTemplate {...args} />,
};

export const StickyHeaderAndColumns: StoryObj<typeof Table> = {
    args: {
        data,
        options,
    },
    render: (args: TableProps) => {
        const { data: templateData, options: templateOptions } = args;
        const { columns } = templateOptions;
        const stickyColumns = columns.map((col, i) => (i < 2 ? { ...col, sticky: true } : col));

        return (
            <div className="sticky-header-and-columns-frame" style={frameStyle}>
                <Table
                    data={templateData}
                    options={{
                        ...templateOptions,
                        columns: stickyColumns,
                        stickyHeader: true,
                        maxHeight: STORY_SCROLLPORT_HEIGHT,
                    }}
                />
            </div>
        );
    },
};
