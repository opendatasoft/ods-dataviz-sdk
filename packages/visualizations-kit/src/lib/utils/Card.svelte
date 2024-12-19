<script lang="ts">
    import type { Source } from '$lib/types';
    import SourceLink from './SourceLink.svelte';

    interface Props {
        title: string | undefined;
        subtitle: string | undefined;
        source: Source | undefined;
        defaultStyle?: boolean;
        children?: import('svelte').Snippet;
    }

    let {
        title,
        subtitle,
        source,
        defaultStyle = true,
        children
    }: Props = $props();
</script>

<div class="card" class:ods-dataviz--default={defaultStyle}>
    {#if title || subtitle}
        <div class="header">
            {#if title}
                <h3>{title}</h3>
            {/if}
            {#if subtitle}
                <p>{subtitle}</p>
            {/if}
        </div>
    {/if}

    {@render children?.()}

    {#if source}
        <SourceLink {source} />
    {/if}
</div>

<style>
    h3,
    p {
        margin: 0;
    }

    .header {
        margin-bottom: 13px;
        /* width: 100%; */
    }

    .card {
        /* Common vars that should be accessible in all components */
        --border-radius-6: 6px;
        --spacing-50: 6px;
        --spacing-75: 9px;
        --spacing-100: 13px;
        --border-color: #cbd2db;
        --background-color: #fff;
        /* FIXME: Only using flex style to center source link */
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        width: 100%;
    }
</style>
