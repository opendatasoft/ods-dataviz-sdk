<script lang="ts">
    import type { Source } from 'types';
    import SourceLink from '../SourceLink.svelte';
    import CardHeader from './CardHeader.svelte';

    export let title: string | undefined;
    export let subtitle: string | undefined;
    export let source: Source | undefined;
    export let defaultStyle = true;
</script>

<div class="ods-viz-card" class:ods-viz--default-style={defaultStyle}>
    <CardHeader title={title} subtitle={subtitle} />
    <slot />
    {#if source}
        <SourceLink {source} />
    {/if}
</div>

<style>
    div {
        /* FIXME: Only using flex style to center source link */
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        width: 100%;
    }
</style>
