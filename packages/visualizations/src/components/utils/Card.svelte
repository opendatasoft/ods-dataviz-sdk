<script lang="ts">
    import type { CardProps } from 'types';
    import LinksMenu from './LinksMenu.svelte';

    // Ensure exported type matches declared props
    type $$Props = CardProps;

    export let title: $$Props['title'];
    export let subtitle: $$Props['subtitle'];
    export let defaultStyle: $$Props['defaultStyle'] = true;
    export let links: $$Props['links'];
    export let style: $$Props['style'] = null;
    export let className: $$Props['className'] = null;
    export let clientWidth: $$Props['clientWidth'];
    export let tag: $$Props['tag'] = 'div';
    export let fill: $$Props['fill'] = false;
</script>

<svelte:element
    this={tag}
    bind:clientWidth
    class="card {className || ''}"
    class:ods-dataviz--default={defaultStyle}
    class:ods-dataviz--fill={fill}
    {style}
>
    {#if title || subtitle || links}
        <!-- svelte-ignore a11y-structure -->
        <svelte:element this={tag === 'figure' ? 'figcaption' : 'div'} class="header">
            <div class="header-content">
                {#if title}
                    <h3>{title}</h3>
                {/if}
                {#if subtitle}
                    <p>{subtitle}</p>
                {/if}
            </div>
            {#if links}
                <LinksMenu {links} />
            {/if}
        </svelte:element>
    {/if}

    <slot />
</svelte:element>

<style>
    /*
     * The parent decides the width, and the height too when filling, so the padding and the border
     * the modifiers below add sit inside that size instead of growing past it. Without it a card
     * asked for the full width of its container renders wider than the container by its own padding
     * and border, and the reading-end border falls outside.
     */
    .card {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        height: auto;
        margin: 0;
        position: relative;
    }
    .card.ods-dataviz--default,
    .card.ods-dataviz--maps {
        padding: var(--visualization-card-padding);
        background-color: var(--visualization-card-background);
        /*
         * Width and colour are separate variables, as on the KPI card: a transparent border still
         * takes its pixel of layout, so a host drawing a visualization edge to edge has to set the
         * width to 0, not only the colour.
         */
        border: var(--visualization-card-border-width) solid var(--visualization-card-border);
        border-radius: var(--visualization-card-border-radius);
    }
    .card.ods-dataviz--default {
        flex-wrap: wrap;
    }
    /* Take the height the parent gives us instead of the content's, and `nowrap` stops a full-height
     * slot from wrapping onto a second flex column. Declared after `--default` so both win over it. */
    .card.ods-dataviz--fill {
        height: 100%;
        flex-wrap: nowrap;
    }
    h3,
    p {
        margin: 0;
    }
    .header {
        width: 100%;
        margin: 0 0 1em 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .header-content {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }
</style>
