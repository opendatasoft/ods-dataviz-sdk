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

    .markdown-text-container--align-justify {
        text-align: justify;
    }
</style>
