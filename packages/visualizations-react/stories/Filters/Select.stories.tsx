import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState, CSSProperties } from "react";
import { Select } from '../../src';

const meta: ComponentMeta<typeof Select> = {
    title: 'Filters/Select',
    component: Select,
};

export default meta;

const Template: ComponentStory<typeof Select> = (args) => {
    const [query, setQuery] = useState<string | null>('');

    return (
        <>
            <Select {...args} handleFilter={(value:string|null) => setQuery(value)} />
            { query }
        </>
    );
};

export const SelectSingle = Template.bind({});

SelectSingle.args = {
    options: {
        fieldName: 'field',
        availableValues: ['one', 'two', 'three', 'four'],
        isMulti: false,
        placeholder: 'Select a value'
    },
};

export const SelectSingleSearchable = Template.bind({});

SelectSingleSearchable.args = {
    options: {
        fieldName: 'field',
        availableValues: ['one', 'two', 'three', 'four'],
        isMulti: false,
        isSearchable: true,
        placeholder: 'Select a value'
    },
};

export const SelectMulti = Template.bind({});

SelectMulti.args = {
    options: {
        fieldName: 'field',
        availableValues: ['one', 'two', 'three', 'four'],
        isMulti: true,
        placeholder: 'Select multiple values'
    },
};

export const SelectMultiSearchable = Template.bind({});

SelectMultiSearchable.args = {
    options: {
        fieldName: 'field',
        availableValues: ['one', 'two', 'three', 'four'],
        isMulti: true,
        isSearchable: true,
        placeholder: 'Select multiple values'
    },
};

export const SelectSingleMenuOpen = Template.bind({});

SelectSingleMenuOpen.args = {
    options: {
        fieldName: 'field',
        availableValues: ['one', 'two', 'three', 'four'],
        placeholder: 'Select a value with a ligth blue background',
        isMenuOpen: true,
    },
    style: {
        '--filter-select-background-color': '#9fc6f5',
    } as CSSProperties,
};