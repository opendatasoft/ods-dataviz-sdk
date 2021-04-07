import type { MarkdownTextOptions } from '../types';
import MarkdownTextImpl from './MarkdownText.svelte';
import { SvelteImpl } from '../SvelteImpl';

export default class Chart extends SvelteImpl<string, MarkdownTextOptions> {
    protected getSvelteComponentClass(): typeof MarkdownTextImpl {
        return MarkdownTextImpl;
    }
}
