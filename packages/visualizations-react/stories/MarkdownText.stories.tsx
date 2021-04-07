import { ChartOptions, DataFrame, MarkdownTextOptions } from '@opendatasoft/visualizations';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import type { Props } from '../src';
import { MarkdownText } from '../src';

const meta: Meta = {
    title: 'MarkdownText',
    component: MarkdownText,
    parameters: {
        controls: {
            expanded: true,
        },
    },
    decorators: [
        (Story) => (
            <div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '90vh',
                    }}
                >
                    <Story />
                </div>
            </div>
        ),
    ],
};

export default meta;

const Template = (args: Props<string, MarkdownTextOptions>) => <MarkdownText {...args} />;

export const Default: Story<Props<string, MarkdownTextOptions>> = Template.bind({});

const style = {
    width: '50%',
    maxWidth: '500px',
};

Default.args = {
    style,
    data: '## Title',
    options: {},
};