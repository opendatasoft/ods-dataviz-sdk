<script lang="ts" context="module">

</script>

<script lang="ts">
    import type {
        MarkdownTextOptions,
    } from '../types';
    import type { Async } from '../../types';
    export let data: Async<string>;
    export let options: MarkdownTextOptions;
    const marked = require('marked');

    $: renderedText = marked(data);
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
