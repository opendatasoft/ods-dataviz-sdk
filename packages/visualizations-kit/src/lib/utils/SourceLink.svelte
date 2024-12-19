<script lang="ts">
    import type { Source } from '$lib/types';

    interface Props {
        source: Source;
    }

    let { source }: Props = $props();
    const { href, label = 'View source', style } = source;
</script>

<div class="source-link" {style}>
    <a {href} target="_blank" rel="noopener norefer">
        {label}
    </a>
</div>

<style>
    .source-link {
        flex-shrink: 1;
        align-self: center;
    }

    a {
        font-size: var(--source-link-font-size, 12px);
    }
</style>
