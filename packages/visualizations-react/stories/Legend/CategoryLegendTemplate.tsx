import React from 'react';
import { ComponentStory } from '@storybook/react';
import { CategoryLegendOptions } from '@opendatasoft/visualizations';
import { CategoryLegend, SimpleProps } from '../../src';

const CategoryLegendTemplate: ComponentStory<typeof CategoryLegend> = (
    args: SimpleProps<CategoryLegendOptions>
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

export default CategoryLegendTemplate;