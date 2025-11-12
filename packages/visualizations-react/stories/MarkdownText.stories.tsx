import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MarkdownText } from 'src';

const meta: Meta<typeof MarkdownText> = {
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
                    <div
                        style={{
                            width: '50%',
                            maxWidth: '500px',
                        }}
                    >
                        {Story()}
                    </div>
                </div>
            </div>
        ),
    ],
};

export default meta;

export const Default: StoryObj<typeof MarkdownText> = {
    args: {
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
    },
};

export const Link: StoryObj<typeof MarkdownText> = {
    args: {
        data: {
            value: `
        [This link should have target=_blank](https://www.opendatasoft.com) \n
        [This one shouldn't](/explore)
        `,
        },
        options: {},
    },
};

export const Image: StoryObj<typeof MarkdownText> = {
    args: {
        data: {
            value: `
        I'd like to show an image:
        ![My image](https://hub.huwise.com/static/ods/imgv4/huwise-black.svg "Huwise logo")

        Thanks!
        `,
        },
        options: {},
    },
};
