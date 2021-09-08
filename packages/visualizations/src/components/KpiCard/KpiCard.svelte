<script lang="ts">
    import type { Async } from '../../types';
    import type { KpiCardOptions } from '../types';
    export let data: Async<number>;
    export let options: KpiCardOptions;

    $: formattedValue = data.value !== undefined ? data.value.toLocaleString() : '';
</script>

<div class="kpi-card">
    {#if data.error}
        Error : {JSON.stringify(data.error)}
    {:else}
        {#if options.imgSrc}
            <img src={options.imgSrc} alt="" aria-hidden="true" class="kpi-card__img" />
        {/if}
        <div class="kpi-card__content">
            {#if options.title}
                <h3 class="kpi-card__title">{options.title}</h3>
            {/if}
            <div class="kpi-card__value">
                {#if options.prefix}<span class="kpi-card__prefix">{options.prefix}</span
                    >{/if}{#if data.loading}<span class="kpi-card__value-loading" />{:else}<span
                        class="kpi-card__value-number">{formattedValue}</span
                    >{/if}{#if options.suffix}<span class="kpi-card__suffix">{options.suffix}</span
                    >{/if}
            </div>
            {#if options.description}
                <div class="kpi-card__description">{options.description}</div>
            {/if}
        </div>
    {/if}
</div>

<style>
    .kpi-card {
        display: flex;
        flex-direction: var(--kpi-card-flex-direction, row);
        justify-content: var(--kpi-card-justify-content, center);
        border-radius: var(--kpi-card-border-radius, 1rem);
        background-color: var(--kpi-card-background-color, #fff);
        border-width: var(--kpi-card-border-width, 1px);
        border-style: var(--kpi-card-border-style, solid);
        border-color: var(--kpi-card-border-color, #ddd);
        height: 100%;
        width: 100%;
        overflow: auto;
    }
    .kpi-card__img {
        height: var(--kpi-card-img-height, 10rem);
        padding: var(--kpi-card-img-padding, 1rem);
        align-self: var(--kpi-card-img-align-self, center);
    }
    .kpi-card__title {
        text-align: var(--kpi-card-title-text-align, center);
    }
    .kpi-card__content {
        display: flex;
        padding: var(--kpi-card-content-padding, 1rem);
        flex-direction: var(--kpi-card-content-flex-direction, column);
        align-items: var(--kpi-card-content-align-items, center);
        justify-content: var(--kpi-card-content-justify-content, center);
        align-self: var(--kpi-card-content-align-self, stretch);
    }
    .kpi-card__value {
        font-size: var(--kpi-card-value-font-size, 4rem);
        font-weight: var(--kpi-card-value-font-weight, bold);
        color: var(--kpi-card-value-color, #000);
        text-align: var(--kpi-card-value-text-align, center);
    }
    .kpi-card__description {
        color: var(--kpi-card-description-color, #333);
        text-align: var(--kpi-card-description-text-align, center);
    }
</style>
