<script lang="ts">
    import CategoryLegend from 'components/Legend/CategoryLegend.svelte';
    import Card from 'components/utils/Card.svelte';
    import WelGlMap from '../WebGl';

    import type { PoiMapProps } from './types';
    import { DEFAULT_ASPECT_RATIO } from './constants';

    // ensure exported type matches declared props
    type $$Props = PoiMapProps;

    export let data: $$Props['data'];
    export let options: $$Props['options'];

    // Used in front of console and error messages to debug multiple maps on a same page
    const mapId = Math.floor(Math.random() * 1000);

    $: ({
        title,
        subtitle,
        description,
        legend,
        links,
        aspectRatio = DEFAULT_ASPECT_RATIO,
    } = options);

    $: cssVarStyles = `--aspect-ratio:${aspectRatio};`;
</script>

<Card
    {title}
    {subtitle}
    {links}
    defaultStyle={false}
    style={cssVarStyles}
    tag="figure"
    className="map-card maps-container ods-dataviz--maps"
>
    <div class="main" aria-describedby={description ? mapId.toString() : undefined}>
        {#key options.style}
            <WelGlMap {options} data={data.value} />
        {/key}
    </div>
    {#if description}
        <p id={mapId.toString()} class="a11y-invisible-description">{description}</p>
    {/if}
    {#if legend}
        <CategoryLegend legendOptions={legend} />
    {/if}
</Card>

<style>
    .main {
        aspect-ratio: var(--aspect-ratio);
        flex-grow: 1;
        position: relative;
        display: block;
    }
    /* Suitable for elements that are used via aria-describedby or aria-labelledby */
    .a11y-invisible-description {
        display: none;
    }
</style>
