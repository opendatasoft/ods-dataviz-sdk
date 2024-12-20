import type { Async } from '$lib/types';

export type MarkdownTextProps = {
	data: Async<string>;
	align?: 'left' | 'right' | 'center';
};
