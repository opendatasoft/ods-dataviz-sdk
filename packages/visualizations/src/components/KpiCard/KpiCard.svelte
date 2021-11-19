<script lang="ts">
    import { kpiTooltip } from "./kpiTooltip";
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
        {#if options.header}
            <div class="kpi-card__header">{options.header}</div>
        {/if}
        <div class="kpi-card__body">
            {#if options.imgSrc}
                <img src={options.imgSrc} alt="" aria-hidden="true" class="kpi-card__img" />
            {/if}
            <div class="kpi-card__content">
                {#if options.title}
                    <h3 class="kpi-card__title">{options.title}</h3>
                {/if}
                <div
                use:kpiTooltip={formattedValue}
                class="kpi-card__value">
                    {#if options.prefix}<span class="kpi-card__prefix">{options.prefix}</span
                        >{/if}{#if data.loading}<span class="kpi-card__value-loading" />{:else}<span
                            class="kpi-card__value-number">{formattedValue}</span
                        >{/if}{#if options.suffix}<span class="kpi-card__suffix"
                            >{options.suffix}</span
                        >{/if}
                </div>
                {#if options.description}
                    <div class="kpi-card__description">{options.description}</div>
                {/if}
            </div>
        </div>
        {#if options.footer}
            <div class="kpi-card__footer">{options.footer}</div>
        {/if}
    {/if}
</div>

<style>
    .kpi-card {
        /* Not customizable because required */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        width: 100%;
        overflow: auto;
        box-sizing: border-box;

        /* Box style is customizable */
        background-color: var(--kpi-card-background-color, #fff);
        border-radius: var(--kpi-card-border-radius, 1rem);
        border-width: var(--kpi-card-border-width, 1px);
        border-style: var(--kpi-card-border-style, solid);
        border-color: var(--kpi-card-border-color, #ddd);
        color: var(--kpi-card-color, #333);
    }
    .kpi-card__header {
        /* Not customizable yet */
        padding: 0.5rem;

        /* Box style is customizable  */
        background-color: var(--kpi-card-header-background-color, #f5f5f5);

        /* Text is customizable */
        color: var(--kpi-card-header-color, #333);
        font-size: var(--kpi-card-header-font-size, 1.5rem);
        font-weight: var(--kpi-card-header-font-weight, bold);
        text-align: var(--kpi-card-header-text-align, center);
    }
    .kpi-card__img {
        /* Not customizable yet */
        padding: 0.5rem;

        /* Image display is customizable */
        height: var(--kpi-card-img-height, 10rem);

        /* Layout disposition is customizable */
        align-self: var(--kpi-card-img-align-self, center);
    }

    .kpi-card__content {
        /* Not customizable yet */
        text-align: center;
        /* Layout disposition is customizable */
        align-self: var(--kpi-card-content-align-self, center);
    }
    /*
        Title and description are not customizable.
        User can target the h3 and p element in CSS.
    */
    .kpi-card__body {
        /* Not customizable because required */
        height: 100%;
        display: flex;

        /* Not customizable yet */
        padding: 1rem;

        /* Layout disposition is customizable */
        flex-direction: var(--kpi-card-body-flex-direction, column);
        justify-content: var(--kpi-card-body-justify-content, center);
    }
    .kpi-card__value {
        /* Text is customizable because it does not map to any HTML element */
        font-size: var(--kpi-card-value-font-size, 4rem);
        font-weight: var(--kpi-card-value-font-weight, bold);
        color: var(--kpi-card-value-color, var(--kpi-card-color, #000));
    }
    .kpi-card__footer {
        /* Not customizable yet */
        padding: 0.5rem;

        /* Box style is customizable  */
        background-color: var(--kpi-card-footer-background-color, #f5f5f5);

        /* Text is customizable */
        color: var(--kpi-card-footer-color, #333);
        font-size: var(--kpi-card-footer-font-size, 1.5rem);
        font-weight: var(--kpi-card-footer-font-weight, bold);
        text-align: var(--kpi-card-footer-text-align, center);
    }
</style>
