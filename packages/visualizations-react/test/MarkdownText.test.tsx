import React from 'react';
import { render } from '@testing-library/react';
import { MarkdownText } from '../src';
import './ResizeObserver.mock';
import '@testing-library/jest-dom';

describe('MarkdownText', () => {
    it('renders without crashing', () => {
        const { getByText } = render(<MarkdownText options={{}} data={{value: 'Hello'}}/>)

        getByText('Hello');
    })

    it('renders markdown supported syntax', () => {
        const { getByText, queryByText } = render(<MarkdownText options={{}} data={{value: '**Bold**'}}/>);

        getByText('Bold');
        expect(queryByText('**Bold**')).not.toBeInTheDocument();
    })

    it('doesn\'t transform unsupported syntax', () => {
        const value = 'Hello <strong>bold</strong>\n\n```code```\n\n`inline`\n\n' +
            '![alt text](image.jpg)\n\n~~strikethrough~~';
        const { getByText, getByRole } = render(<MarkdownText options={{}} data={{value}}/>);

        // HTML should be kept as-is (and encoded)
        getByText('Hello <strong>bold</strong>');

        // Code
        getByText('```code```');
        getByText('`inline`');

        // Image (should be parsed as a link, not as an image tag)
        getByRole('link', {name: 'alt text'});

        // Strikethrough
        getByText('~~strikethrough~~');
    })
})