import React from 'react';
import { ComponentStory } from '@storybook/react';
import { CategoryLegendType } from '@opendatasoft/visualizations';
import { CategoryLegend } from '../../src';
import { SimpleProps } from '../../src/components/Props';

const CategoryLegendTemplate: ComponentStory<typeof CategoryLegend> = (
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

export default CategoryLegendTemplate;