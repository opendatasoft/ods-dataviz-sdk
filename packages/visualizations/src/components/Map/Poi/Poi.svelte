<script lang="ts">
    import CategoryLegend from '../../Legend/CategoryLegend.svelte';
    import SourceLink from '../../utils/SourceLink.svelte';
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
        sourceLink,
        aspectRatio = DEFAULT_ASPECT_RATIO,
    } = options);

    $: cssVarStyles = `--aspect-ratio:${aspectRatio};`;
</script>

<figure class="map-card maps-container" style={cssVarStyles}>
    {#if title || subtitle}
        <figcaption>
            {#if title}
                <h3>
                    {title}
                </h3>
            {/if}
            {#if subtitle}
                <p>
                    {subtitle}
                </p>
            {/if}
        </figcaption>
    {/if}
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
    {#if sourceLink}
        <SourceLink source={sourceLink} />
    {/if}
</figure>

<style>
    .map-card {
        display: flex;
        flex-direction: column;
        margin: 0;
        position: relative;
    }
    figcaption {
        margin: 0 0 1em 0;
    }
    figcaption p,
    figcaption h3 {
        margin: 0;
    }

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
