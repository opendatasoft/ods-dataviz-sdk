import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import { Text } from '../../src';

const meta: ComponentMeta<typeof Text> = {
    title: 'Filters/Text',
    component: Text,
};

export default meta;

const Template: ComponentStory<typeof Text> = () => {
    const [query, setQuery] = useState<string | null>('');

    return (
        <>
            <Text options={{}} handleFilter={(value: string | null) => setQuery(value)} />
            {query}
        </>
    );
};

export const TextStory = Template.bind({});
