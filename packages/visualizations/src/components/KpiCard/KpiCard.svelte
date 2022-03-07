<script lang="ts">
    import tippy from '../utils/tippy';
    import type { Async } from '../../types';
    import type { KpiCardOptions } from '../types';
    import SourceLink from '../utils/SourceLink.svelte';
    import { defaultCompactNumberFormat, defaultNumberFormat } from '../utils/formatter';

    export let data: Async<number>;
    export let options: KpiCardOptions;

    let displayValue: string;
    let tooltipValue: string;
    let format: (value: number) => string;
    let formatCompact: (value: number) => string;

    $: format = options.format || defaultNumberFormat;

    $: formatCompact = options.formatCompact || defaultCompactNumberFormat;

    $: if (data.value !== undefined) {
        displayValue = formatCompact(data.value);
        tooltipValue = format(data.value);
    } else {
        displayValue = '';
        tooltipValue = '';
    }
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
                <div class="kpi-card__value">
                    {#if options.prefix}<span class="kpi-card__prefix">{options.prefix}</span>{/if}
                    {#if data.loading}
                        <span class="kpi-card__value-loading" />
                    {:else if tooltipValue !== displayValue}
                        <span
                            use:tippy={{
                                content: tooltipValue,
                            }}
                            aria-label={tooltipValue}
                            class="kpi-card__value-number">{displayValue}</span
                        >
                    {:else}
                        <span class="kpi-card__value-number">{displayValue}</span>
                    {/if}
                    {#if options.suffix}
                        <span class="kpi-card__suffix">{options.suffix}</span>
                    {/if}
                </div>
                {#if options.description}
                    <p class="kpi-card__description">{options.description}</p>
                {/if}
            </div>
        </div>
        {#if options.source}
            <div class="kpi-card__source-link">
                <SourceLink source={options.source} />
            </div>
        {/if}
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
        font-size: var(--kpi-card-header-font-size, 1rem);
        font-weight: var(--kpi-card-header-font-weight, normal);
        text-align: var(--kpi-card-header-text-align, center);
    }
    .kpi-card__img {
        /* Image margin is customizable depending on the KPI layout */
        margin: var(--kpi-card-img-margin, 0 0 0.8rem 0);

        /* Image display is not customizable */
        width: auto;
        height: auto;
        max-width: 4rem;
        max-height: 4rem;
        object-fit: contain;

        /* Layout disposition is customizable */
        align-self: var(--kpi-card-img-align-self, center);
    }

    .kpi-card__content {
        /* Not customizable yet */
        text-align: center;
        display: flex;
        flex-direction: column;
        /* Layout disposition is customizable */
        align-items: var(--kpi-card-content-align-items, center);
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
        padding: 1rem 2rem 1rem 2rem;

        /* Layout disposition is customizable */
        flex-direction: var(--kpi-card-body-flex-direction, column);
        justify-content: var(--kpi-card-body-justify-content, center);
    }
    .kpi-card__title {
        margin: var(--kpi-card-title-margin, 0 0 0.8rem 0);
    }
    .kpi-card__value {
        /* Text is customizable because it does not map to any HTML element */
        margin: var(--kpi-card-value-margin, 0 0 0.8rem 0);
        font-size: var(--kpi-card-value-font-size, 2rem);
        font-weight: var(--kpi-card-value-font-weight, bold);
        color: var(--kpi-card-value-color, var(--kpi-card-color, #000));
    }
    .kpi-card__source-link {
        /* Source link position is customizable */
        align-self: var(--kpi-card-source-link-align-self, center);
        padding: 1rem 0.5rem 0 0.5rem;
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
