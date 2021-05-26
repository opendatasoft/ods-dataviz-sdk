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

<div class="markdown-text-container">
    {@html renderedText}
</div>

<style>
    .markdown-text-container {
        position: relative;
        height: 100%;
        width: 100%;
    }
</style>
