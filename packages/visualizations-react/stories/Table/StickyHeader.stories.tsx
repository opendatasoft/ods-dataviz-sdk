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

const scrollableTableFrameStyle: React.CSSProperties = {
    maxWidth: '800px',
    height: STORY_SCROLLPORT_HEIGHT,
};

/** Story-only: fixed scrollport so the sticky header is visible in Storybook. */
const storyScrollportStyles = `
    .sticky-header-story-frame .scrollbox,
    .sticky-header-and-columns-frame .scrollbox,
    .sticky-header-paginated-frame .scrollbox {
        max-height: ${STORY_SCROLLPORT_HEIGHT};
        overflow-y: auto;
    }
`;

export const StickyHeader: StoryObj<typeof Table> = {
    args: {
        data,
        options: { ...options, stickyHeader: true },
    },
    render: (args: TableProps) => {
        const { data: templateData, options: templateOptions } = args;
        const [isStickyHeaderEnabled, setIsStickyHeaderEnabled] = useState(
            Boolean(templateOptions.stickyHeader)
        );

        return (
            <>
                <style>{storyScrollportStyles}</style>
                <div style={{ marginBottom: '20px' }}>
                    <h3>Sticky header (`options.stickyHeader`)</h3>
                    <p style={{ maxWidth: '42rem', marginBottom: '0.75rem' }}>
                        Scroll inside the table — the header row stays pinned at the top.
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
                <div className="sticky-header-story-frame" style={scrollableTableFrameStyle}>
                    <Table
                        data={templateData}
                        options={{ ...templateOptions, stickyHeader: isStickyHeaderEnabled }}
                    />
                </div>
            </>
        );
    },
};

export const StickyHeaderWithPagination: StoryObj<typeof Table> = {
    args: {
        current: 1,
        recordsPerPage: 4,
    },
    render: (args: Pagination) => {
        const { current = 1, recordsPerPage = 4 } = args;
        const { paginatedData, page, pageSize, setPage } = usePaginatedData({
            current,
            recordsPerPage,
        });

        return (
            <>
                <style>{storyScrollportStyles}</style>
                <p style={{ maxWidth: '42rem', marginBottom: '0.75rem' }}>
                    Scroll inside the table, then change page. The header stays pinned while rows
                    update.
                </p>
                <div className="sticky-header-paginated-frame" style={scrollableTableFrameStyle}>
                    <Table
                        data={paginatedData}
                        options={{
                            ...options,
                            stickyHeader: true,
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
    },
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
            <>
                <style>{storyScrollportStyles}</style>
                <div className="sticky-header-and-columns-frame" style={scrollableTableFrameStyle}>
                    <Table
                        data={templateData}
                        options={{
                            ...templateOptions,
                            columns: stickyColumns,
                            stickyHeader: true,
                        }}
                    />
                </div>
            </>
        );
    },
};
