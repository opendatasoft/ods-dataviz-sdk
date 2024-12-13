import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import type { TableData, Async } from '@opendatasoft/visualizations';
import { Table } from '../../src';
import value from './data';
import options from './options';

const meta: ComponentMeta<typeof Table> = {
    title: 'Table/StickyColumns',
    component: Table,
};
export default meta;

const data: Async<TableData> = {
    value,
    loading: false,
};

const Template: ComponentStory<typeof Table> = args => {
    const { data: templateData, options: templateOptions } = args;
    const { columns } = templateOptions;
    const [stickyColumns, setColumns] = useState(columns);
    
    const handleStickyToggle = (columnKey: string) => {
        setColumns(prev => prev.map(col => col.key === columnKey 
              ? { ...col, sticky: !col.sticky }
              : col)
        );
    };

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
            <Table data={templateData} options={{ ...templateOptions, columns: stickyColumns }} />
        </>
    );
    };

export const StickyColumns = Template.bind({});
StickyColumns.args = {
    data,
    options,
};

export const RtlStickyColumns = Template.bind({});
RtlStickyColumns.parameters = {
    direction: 'rtl',
};
RtlStickyColumns.args = {
    data,
    options,
};