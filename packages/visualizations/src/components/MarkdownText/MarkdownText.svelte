<script lang="ts" context="module">
</script>

<script lang="ts">
    import type { MarkdownTextOptions } from '../types';
    import type { Async } from '../../types';
    export let data: Async<string>;
    export let options: MarkdownTextOptions;
    import MarkdownIt from 'markdown-it';
    import MarkdownItMark from 'markdown-it-mark';

    const md = new MarkdownIt().use(MarkdownItMark);
    $: renderedText = md.render(data);
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
`