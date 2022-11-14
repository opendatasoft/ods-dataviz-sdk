import type { MarkdownTextOptions } from './types';
import MarkdownTextImpl from './MarkdownText.svelte';
import SvelteImpl from '../SvelteImpl';

export default class MarkdownText extends SvelteImpl<string, MarkdownTextOptions> {
    protected getSvelteComponentClass(): typeof MarkdownTextImpl {
        return MarkdownTextImpl;
    }
}
