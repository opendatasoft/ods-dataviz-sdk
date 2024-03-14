import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MarkdownText } from 'src';

const meta: ComponentMeta<typeof MarkdownText> = {
    title: 'MarkdownText',
    component: MarkdownText,
    decorators: [
        Story => (
            <div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '90vh',
                    }}
                >
                    <div style={{
                        width: '50%',
                        maxWidth: '500px',
                    }}>
                        {Story()}
                    </div>
                </div>
            </div>
        ),
    ],
};

export default meta;

const Template: ComponentStory<typeof MarkdownText> = args => <MarkdownText {...args} />;

export const Default = Template.bind({});

Default.args = {
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

export const Link = Template.bind({});
Link.args = {
    data: {
        value: `
        [This link should have target=_blank](https://www.opendatasoft.com) \n
        [This one shouldn't](/explore)
        `,
    },
    options: {},
};
