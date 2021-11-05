<script lang="ts" context="module">
    import MarkdownIt from 'markdown-it';
    import MarkdownItMark from 'markdown-it-mark';
    import type { MarkdownTextOptions } from '../types';
    import type { Async } from '../../types';

    const md = new MarkdownIt('zero').use(MarkdownItMark).enable([
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
