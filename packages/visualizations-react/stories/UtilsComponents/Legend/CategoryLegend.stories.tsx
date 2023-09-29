import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import type { CategoryLegendType } from '@opendatasoft/visualizations';
import { CATEGORY_ITEM_VARIANT } from '@opendatasoft/visualizations';
import { CategoryLegend } from '../../../src';
import { SimpleProps } from '../../../src/components/Props';

const meta: ComponentMeta<typeof CategoryLegend> = {
    title: 'Utils/Legend',
    component: CategoryLegend,
};

export default meta;

const Template: ComponentStory<typeof CategoryLegend> = (
    args: SimpleProps<CategoryLegendType>
) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <CategoryLegend {...args} style={{ width: '60vw' }} />
    </div>
);

export const CategoryCircleLegend = Template.bind({});
const CategoryCircleLegendArgs: SimpleProps<CategoryLegendType> = {
    legendOptions: {
        type: 'category' as const,
        title: "I Am Legend",
        items: [
            { label: 'category 1', color: '#F5C2C1', borderColor: 'red', variant: CATEGORY_ITEM_VARIANT.Circle },
            { label: 'category 2', color: '#90EE90', borderColor: 'green', variant: CATEGORY_ITEM_VARIANT.Circle },
            { label: 'category 3', color: '#ADD8E6', borderColor: 'blue', variant: CATEGORY_ITEM_VARIANT.Circle },
        ],
        align: 'start' as const,
    },
};
CategoryCircleLegend.args = CategoryCircleLegendArgs;