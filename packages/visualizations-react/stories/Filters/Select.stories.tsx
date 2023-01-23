import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";
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

export const SelectStory = Template.bind({});

SelectStory.args = {
    options: {
        fieldName: 'field',
        availableValues: ['one', 'two', 'three'],
        multiple: false,
        placeholder: 'Select a value'
    },
};
