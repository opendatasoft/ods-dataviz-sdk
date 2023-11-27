import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PoiMap } from '../../src';

import { layers, sources, options } from './utils';

const {} = get;

const meta: ComponentMeta<typeof PoiMap> = {
    title: 'Poi/PoiMap/Tests',
    component: PoiMap,
};

export default meta;

const Template: ComponentStory<typeof PoiMap> = (args) => (
    <div
        style={{
            width: '50%',
            minHeight: '100px',
            minWidth: '100px',
            margin: 'auto',
            border: '1px solid black',
        }}
    >
        <PoiMap {...args} />
    </div>
);

/**
 * STORY: No layer params
 */
export const NoLayers: ComponentStory<typeof PoiMap> = Template.bind({});
const NoLayersArgs = {
    data: {},
    options,
};
NoLayers.args = NoLayersArgs;

/**
 * STORY: Not interactive
 */
export const NotInteractive: ComponentStory<typeof PoiMap> = Template.bind({});
const NotInteractiveArgs = {
    data: { value: { layers, sources } },
    options: { ...options, interactive: false },
};
NotInteractive.args = NotInteractiveArgs;

/**
 * STORY: With match expression
 */
export const MatchExpression: ComponentStory<typeof PoiMap> = Template.bind({});
const MatchExpressionArgs = {
    data: {
        value: {
            layers,
            sources,
        },
    },
    options,
};
MatchExpression.args = MatchExpressionArgs;

/**
 * STORY: With legend on start align
 */
export const LegendStart: ComponentStory<typeof PoiMap> = Template.bind({});
const LegendStartArgs = {
    data: {
        value: {
            layers,
            sources,
        },
    },
    options: { ...options, legend },
};
LegendStart.args = LegendStartArgs;

/**
 * STORY: With legend on center align
 */
export const LegendCenter: ComponentStory<typeof PoiMap> = Template.bind({});
const LegendCenterArgs = {
    data: {
        value: {
            layers,
            sources,
        },
    },
    options: { ...options, legend: { ...legend, align: 'center' as const } },
};
LegendCenter.args = LegendCenterArgs;

/**
 * STORY: With legend on center align
 */
export const LegendEnd: ComponentStory<typeof PoiMap> = Template.bind({});
const LegendEndArgs = {
    data: {
        value: {
            layers,
            sources,
        },
    },
    options: { ...options, legend: { ...legend, align: 'end' as const } },
};
LegendEnd.args = LegendEndArgs;
