<script lang="ts">
    import type { Source } from '../types';

    export let source: Source;
    const { href, label = 'View source' } = source;
</script>

<a {href} target="_blank" rel="noopener norefer">
    {label}
</a>

<style>
    a {
        font-size: var(--source-link-font-size, 12px);
    }
</style>
