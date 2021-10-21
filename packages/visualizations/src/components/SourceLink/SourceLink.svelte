<script lang="ts">
    import type { Source } from '../types';

    export let source: Source;
    const { href, target, label = 'View source', disabled = false } = source;
</script>

<a {href} {target} rel="noopener norefer" class:disabled>
    {label}
</a>

<style>
    a {
        font-size: var(--chart-source-font-size, 12px);
    }

    a.disabled {
        pointer-events: none;
    }
</style>
