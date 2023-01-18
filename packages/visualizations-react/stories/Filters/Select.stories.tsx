import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";
import { Select } from '../../src';

const meta: ComponentMeta<typeof Select> = {
    title: 'Filters/Select',
    component: Select,
};

export default meta;

const options = {
    fieldName: 'field',
    availableValues: ['one', 'two', 'three'],
};

const Template: ComponentStory<typeof Select> = () => {
    const [query, setQuery] = useState<string | null>('');
    
    return (
        <>
            <Select options={options} handleFilter={(value:string|null) => setQuery(value)} />
            { query }
        </>
    );
};

export const SelectStory = Template.bind({});
