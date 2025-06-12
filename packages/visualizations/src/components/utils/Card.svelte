<script lang="ts">
    import type { Source } from 'types';
    import SourceLink from './SourceLink.svelte';

    export let title: string | undefined;
    export let subtitle: string | undefined;
    export let source: Source | undefined;
    export let defaultStyle = true;
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

    <slot />

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
        --spacing-200: 26px;
        --border-color: #cbd2db;
        --background-color: #fff;
        /* FIXME: Only using flex style to center source link */
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        width: 100%;
    }
</style>
