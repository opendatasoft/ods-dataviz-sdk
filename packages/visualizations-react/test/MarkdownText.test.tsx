import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarkdownText } from 'src';

describe('MarkdownText', () => {
    it('renders without crashing', () => {
        const { getByText } = render(<MarkdownText options={{}} data={{ value: 'Hello' }} />);

        getByText('Hello');
    });

    it('renders markdown supported syntax', () => {
        const { getByText, queryByText } = render(
            <MarkdownText options={{}} data={{ value: '**Bold**' }} />
        );

        getByText('Bold');
        expect(queryByText('**Bold**')).not.toBeInTheDocument();
    });

    it("doesn't transform unsupported syntax", () => {
        const value =
            'Hello <strong>bold</strong>\n\n```code```\n\n`inline`\n\n' +
            '![alt text](image.jpg)\n\n~~strikethrough~~';
        const { getByText, getByRole } = render(<MarkdownText options={{}} data={{ value }} />);

        // HTML should be kept as-is (and encoded)
        getByText('Hello <strong>bold</strong>');

        // Code
        getByText('```code```');
        getByText('`inline`');

        // Image (should be parsed as a link, not as an image tag)
        getByRole('link', { name: 'alt text' });

        // Strikethrough
        getByText('~~strikethrough~~');
    });

    it("doesn't display escape characters", () => {
        const value = 'Hi there \\*\\*world\\*\\*';

        const { getByText } = render(<MarkdownText options={{}} data={{ value }} />);

        getByText('Hi there **world**');
    });

    it('adds attributes to links', () => {
        const value = `
        [full](https://www.opendatasoft.com) \n
        [relative](/explore)
        `;
        render(<MarkdownText options={{}} data={{ value }} />);

        const full = screen.getByRole('link', { name: 'full' });
        const relative = screen.getByRole('link', { name: 'relative' });

        expect(full).toHaveAttribute('target', '_blank');
        expect(relative).not.toHaveAttribute('target', '_blank');
    });
});
