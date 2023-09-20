import { ComponentMeta } from '@storybook/react';
import type { CategoryLegendOptions } from '@opendatasoft/visualizations';
import { CATEGORY_ITEM_VARIANT } from '@opendatasoft/visualizations';
import { CategoryLegend, SimpleProps } from '../../src';
import CategoryLegendTemplate from './CategoryLegendTemplate';

const meta: ComponentMeta<typeof CategoryLegend> = {
    title: 'Legend',
    component: CategoryLegend,
};

export default meta;

export const CategoryCircleLegend = CategoryLegendTemplate.bind({});
const CategoryCircleLegendArgs: SimpleProps<CategoryLegendOptions> = {
    options: {
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
