<script lang="ts" context="module">
    import MarkdownIt from 'markdown-it';
    import MarkdownItMark from 'markdown-it-mark';
    import type StateCore from 'markdown-it/lib/rules_core/state_core';
    import type { MarkdownTextOptions } from '../types';
    import type { Async } from '../../types';

    // This MarkdownIt plugin enforces lists to be displayed as tight, because we only want to support them
    // at the moment.
    function tightLists(md: MarkdownIt) {
        md.core.ruler.after('inline', 'all-tight-lists', (state: StateCore) => {
            let withinParagraph = false;

            // In order to display lists as tight, we need to hide paragraphs before MarkdownIt renders then.
            // https://github.com/markdown-it/markdown-it/issues/678#issuecomment-637895300
            state.tokens.forEach((token) => {
                if (token.type === 'list_item_open') {
                    withinParagraph = true;
                } else if (token.type === 'list_item_close') {
                    withinParagraph = false;
                } else if (
                    withinParagraph &&
                    (token.type === 'paragraph_open' || token.type === 'paragraph_close')
                ) {
                    // eslint-disable-next-line no-param-reassign
                    token.hidden = true;
                }
            });

            return true;
        });
    }

    const md = new MarkdownIt('zero').use(MarkdownItMark).use(tightLists).enable([
        'hr',
        'list',
        'heading',
        'emphasis', // bold & italic
        'link',
        'escape',
    ]);
</script>

<script lang="ts">
    export let data: Async<string>;
    export let options: MarkdownTextOptions;
    $: renderedText = md.render(data.value || '');
</script>

<div class="markdown-text-container markdown-text-container--align-{options.align}">
    {@html renderedText}
</div>

<style>
    .markdown-text-container {
        position: relative;
        height: 100%;
        width: 100%;
        word-wrap: break-word;
    }

    .markdown-text-container--align-left {
        text-align: left;
    }

    .markdown-text-container--align-center {
        text-align: center;
    }

    .markdown-text-container--align-right {
        text-align: right;
    }

    .markdown-text-container :global(ol),
    .markdown-text-container :global(ul) {
        list-style-position: inside;
        padding-left: 0;
    }

    .markdown-text-container :global(ol > li > p),
    .markdown-text-container :global(ul > li > p) {
        display: inline-block;
    }
</style>
