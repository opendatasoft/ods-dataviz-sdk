import React from 'react';
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Async, createFilteredData } from '@opendatasoft/visualizations'; 
import { Filter, KpiCard } from '../src';
import { defaultSource } from './utils';

console.log('story', createFilteredData)

const kpiOptions =  {
    header: 'Header',
    title: 'Title',
    prefix: '$',
    suffix: ' M',
    description: 'Description',
    footer: 'Footer',
    source: defaultSource,
    // Kpi Card
};

const FilterStory = () => {
    const filteredData = createFilteredData();

    return (
        <>
            <Filter data={filteredData} options="hello" />
            <KpiCard data={filteredData} options={kpiOptions} />
        </>
    );
};

const meta: ComponentMeta<typeof FilterStory> = {
    title: 'Filter',
    component: Filter,
    decorators: [
        Story => (
                <div
                    style={{
                    display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '90vh',
                    }}
                >
                    {Story()}
                </div>
        ),
    ],
};
export default meta;

const Template: ComponentStory<typeof FilterStory> = (args: any) => (
    <FilterStory {...args} />
);
export const FilterTestStory = Template.bind({});

