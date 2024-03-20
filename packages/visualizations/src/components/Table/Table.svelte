<script lang="ts">
    import type { TableProps } from './types';
    import Pagination from './Pagination';
    import { generateId } from '../utils';

    import SourceLink from '../utils/SourceLink.svelte';
    import Header from './Header.svelte';
    import Body from './Body.svelte';
    import { updateLocale } from './store';
    import { MAX_ROW_HEIGHT } from './constants';

    // ensure exported type matches declared props
    type $$Props = TableProps;

    export let data: $$Props['data'];
    export let options: $$Props['options'];

    const tableId = `table-${generateId()}`;

    $: ({ value: records } = data);
    $: ({
     columns, title, subtitle, description, source, unstyled, locale, pages 
    } = options);
    $: defaultStyle = !unstyled;
    $: updateLocale(locale);
    /* Preserves paginations controls positioning
    min heigh of table + controls = max-height of row * (number of rows + 1 for headers)
    */
    $: minHeight = pages ? `${MAX_ROW_HEIGHT * (pages.recordsPerPage + 1)}px` : 'none';
</script>

<div class="ods-dataviz-sdk-table" class:ods-dataviz-sdk-table--default={defaultStyle}>
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
    <div class="table-controls" style="--min-height: {minHeight}">
        <div class="table-wrapper">
            <table aria-describedby={description ? tableId : undefined}>
                <Header {columns} />
                {#if records}
                    <Body {records} {columns} />
                {/if}
            </table>
        </div>
    </div>
    {#if pages}
        <Pagination {...pages} />
    {/if}
    {#if description}
        <p id={tableId} class="a11y-invisible-description">{description}</p>
    {/if}
    {#if source}
        <SourceLink {source} />
    {/if}
</div>

<style lang="scss">
    @import './index.scss';
</style>