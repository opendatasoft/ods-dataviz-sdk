import React from "react";
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DataFrame, Column , TableOptions } from "@opendatasoft/visualizations";
import { Table } from '../../src';
import type { Props } from "../../src";

import './my-class.css';

const meta: ComponentMeta<typeof Table> = {
    title: 'table',
};
export default meta;

const value: DataFrame = [
    {
        name: 'Mohn',
        address: 'New York',
        number: 10,
    },
    {
        name: 'Kohn',
        address: '1 street New York',
        number: 10,
    },
    {
        name: 'John',
        address: '1 street 789000 NewYork',
        number: 10,
    },
    {
        name: 'Lohn',
        address: '1 street 789000 NewYork USofA',
        number: 10,
    },
];

const data = {
    value,
    isLoading: false,
};

const sortName = (a: any, b: any) => (a.name < b.name) ? -1 : 1;
const sortAddress = (a: any, b: any) => a.address.length - b.address.length;

const columns: Column[] = [
    {
        title: 'Name',
        key: 'name',
        format: string => `<span>${string}</span>`,
    },
    {
        title: 'Address',
        key: 'address',
        format: string => `<span>${string}</span>`,
    },
    {
        title: 'Number',
        key: 'number',
        format: number => `<span>${number}</span>`,
    },
];
const sortableColumns: Column[] = [
    {
        title: 'Name',
        key: 'name',
        format: string => `<span>${string}</span>`,
        onSort: sortName,
    },
    {
        title: 'Address',
        key: 'address',
        format: string => `<span>${string}</span>`,
        onSort: sortAddress,
    },
    {
        title: 'Number',
        key: 'number',
        format: number => `<span>${number}</span>`,
    },
];

const buildTemplate = (className?: string) => {
    const Template: ComponentStory<typeof Table> = args => (
    <div className={className}>
        <Table {...args} />
    </div>
    );
    return Template;
};
const Template = buildTemplate();
const StyledTemplate = buildTemplate('myClass');

export const Default = Template.bind({});
Default.args = {
    data,
    options: {
        columns,
        pages: {
            current: 1,
            total: 1,
            setPage: () => {},
        }
    }
} as Props<DataFrame, TableOptions>;

export const DefaultSorted = Template.bind({});
DefaultSorted.args = {
    data,
    options: {
        columns,
        defaultSortKey: 'name',
        pages: {
            current: 1,
            total: 1,
            setPage: () => {},
        }
    }
} as Props<DataFrame, TableOptions>;

export const Sortable = Template.bind({});
Sortable.args = {
    data,
    options: {
        columns: sortableColumns,
        defaultSort: 'name',
        pages: {
            current: 1,
            total: 1,
            setPage: () => {},
        }
    }
} as Props<DataFrame, TableOptions>;

export const Styled = StyledTemplate.bind({});
Styled.args = {
    data,
    options: {
        columns,
        pages: {
            current: 1,
            total: 1,
            setPage: () => {},
        }
    }
};