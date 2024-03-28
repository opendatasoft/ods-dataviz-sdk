import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import type { TableData, Async } from '@opendatasoft/visualizations';

import './custom-style.css';

import { Table } from '../../src';

import value from './data';
import options from './options';

const meta: ComponentMeta<typeof Table> = {
    title: 'Table/Table',
    component: Table,
};
export default meta;

const data: Async<TableData> = {
    value,
    loading: false,
};

const Template: ComponentStory<typeof Table> = args => <Table {...args} />;

export const Playground = Template.bind({});
Playground.args = {
    data,
    options,
};

const CustomStyleTemplate: ComponentStory<typeof Table> = args => (
    <div className="table-story--custom-style">
        <Table {...args} />
    </div>
);
export const CustomStyle = CustomStyleTemplate.bind({});
CustomStyle.args = {
    data,
    options,
};

const ScrollTemplate: ComponentStory<typeof Table> = args => (
    <div style={{ maxWidth: '800px' }}>
        <Table {...args} />
    </div>
);

export const Scroll = ScrollTemplate.bind({});
Scroll.args = {
    data,
    options,
};

export const Unstyled = Template.bind({});
Unstyled.args = {
    data,
    options: { ...options, unstyled: true },
};
