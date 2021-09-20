import type { MarkdownTextOptions } from '../types';
import MarkdownTextImpl from './MarkdownText.svelte';
import SvelteImpl from '../SvelteImpl';

export default class MarkdownText extends SvelteImpl<string, MarkdownTextOptions> {
    // eslint-disable-next-line class-methods-use-this
    protected getSvelteComponentClass(): typeof MarkdownTextImpl {
        return MarkdownTextImpl;
    }
}
