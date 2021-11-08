import React from 'react';
import { MarkdownTextOptions } from '@opendatasoft/visualizations';
import { Meta, Story } from '@storybook/react';
import type { Props } from '../src';
import { MarkdownText } from '../src';

const meta: Meta = {
    title: 'MarkdownText',
    component: MarkdownText,
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
    data: {
        value:
            '' +
            '## Title\n\n' +
            'This list should appear tight:\n\n' +
            '- Item 1\n' +
            '- Item 2\n\n' +
            '- Item 3\n\n\n\n' +
            '- Item 4\n' +
            '- Item 5',
    },
    options: {},
};
