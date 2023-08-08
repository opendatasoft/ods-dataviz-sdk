<script lang="ts">
    // Title of the map
    export let title: string | null = null;
    // Subtitle of the map
    export let subtitle: string | null = null;
    // Accessibility description
    export let description: string | null = null;
    export let mapId: number;
    export let aspectRatio: number | null = null;
</script>

<figure class="map-card maps-container" style={`--aspect-ratio:${aspectRatio};`}>
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
        <slot />
    </div>
    {#if description}
        <p id={mapId.toString()} class="a11y-invisible-description">{description}</p>
    {/if}
</figure>

<style>
    .map-card {
        display: flex;
        flex-direction: column;
        margin: 0;
        position: relative;
    }
    /* To add classes programmatically in svelte we will use a global selector. We place it inside a local selector to obtain some encapsulation and avoid side effects */
    .map-card :global(.tooltip-on-hover > .maplibregl-popup-content) {
        border-radius: 6px;
        box-shadow: 0px 6px 13px rgba(0, 0, 0, 0.26);
        padding: 13px;
    }
    .map-card :global(.tooltip-on-hover .maplibregl-popup-tip) {
        border-top-color: transparent;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
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
