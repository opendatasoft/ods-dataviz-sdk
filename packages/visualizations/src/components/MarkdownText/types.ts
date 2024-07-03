import type { Async } from '../../types';

export type MarkdownTextOptions = {
    align?: 'left' | 'right' | 'center';
};

export type MarkdownTextProps = {
    data: Async<string>;
    options: MarkdownTextOptions;
};
