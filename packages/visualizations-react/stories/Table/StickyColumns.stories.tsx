import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import type { TableData, Async, TableProps, TableOptions } from '@opendatasoft/visualizations';
import { Table } from '../../src';
import value from './data';
import options from './options';

const meta: Meta<typeof Table> = {
    title: 'Table/StickyColumns',
    component: Table,
};
export default meta;

const data: Async<TableData> = {
    value,
    loading: false,
};

// Shared by the sticky-columns demos below: pins the first 2 columns (toggleable via
// checkboxes) and pre-scrolls so the pinned/scrollable boundary is visible in the snapshot.
// `extraOptions` lets a story layer on top, e.g. showRowNumbers.
const renderStickyColumnsDemo =
    (extraOptions: Partial<TableOptions> = {}) =>
    (args: TableProps) => {
        const { data: templateData, options: templateOptions } = args;
        const { columns } = templateOptions;
        const initialStickyCols = columns.map((col, i) => (i < 2 ? { ...col, sticky: true } : col));
        const [stickyColumns, setColumns] = useState(initialStickyCols);

        const handleStickyToggle = (columnKey: string) => {
            setColumns(prev =>
                prev.map(col => (col.key === columnKey ? { ...col, sticky: !col.sticky } : col))
            );
        };

        // sets an initial scroll for the snapshot
        useEffect(() => {
            const scrollBox = document.querySelector('.scrollbox');
            if (scrollBox) {
                scrollBox.scrollLeft = 200;
            }
        });

        return (
            <>
                <div style={{ marginBottom: '20px' }}>
                    <h3>Pinned columns</h3>
                    {stickyColumns.map(col => (
                        <React.Fragment key={col.key}>
                            <input
                                type="checkbox"
                                id={`${col.key}`}
                                key={col.key}
                                checked={Boolean(col?.sticky)}
                                onChange={() => handleStickyToggle(col.key)}
                            />
                            <label htmlFor={col.key}>{col.title}</label>
                        </React.Fragment>
                    ))}
                </div>
                <Table
                    data={templateData}
                    options={{ ...templateOptions, ...extraOptions, columns: stickyColumns }}
                />
            </>
        );
    };

export const StickyColumns: StoryObj<typeof Table> = {
    args: {
        data,
        options,
    },
    render: renderStickyColumnsDemo(),
};

// Demoes the row-number column's scroll boundary (border + shadow) alongside pinned
// columns: pre-scrolled so both the pinned-column border and the row-number border/shadow
// are visible together, matching how they'll actually appear once a user scrolls.
export const StickyColumnsWithRowNumbers: StoryObj<typeof Table> = {
    args: {
        data,
        options,
    },
    render: renderStickyColumnsDemo({ showRowNumbers: true }),
};

export const RtlStickyColumns: StoryObj<typeof Table> = {
    parameters: {
        direction: 'rtl',
    },
    args: {
        data,
        options,
    },
    render: renderStickyColumnsDemo(),
};
