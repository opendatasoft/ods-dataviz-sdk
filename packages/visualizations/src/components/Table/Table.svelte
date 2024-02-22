<script lang="ts">
    import type { Async } from '../../types';
    import type { TableData, TableOptions } from './types';

    import { generateId } from '../utils';

    import SourceLink from '../utils/SourceLink.svelte';
    import Header from './Header.svelte';
    import Body from './Body.svelte';

    export let data: Async<TableData>;
    export let options: TableOptions;

    const tableId = `table-${generateId()}`;

    $: ({ value: records } = data);
    // FIXME: Eslint is in conflict with prettier
    // eslint-disable-next-line object-curly-newline
    $: ({ columns, title, subtitle, description, source, unstyled } = options);
    $: defaultStyle = !unstyled;
</script>

<div class="ods-dataviz-sdk-table" class:ods-dataviz-sdk-table--default={defaultStyle}>
    {#if title || subtitle}
        <div class="dataviz-header">
            {#if title}
                <h3>{title}</h3>
            {/if}
            {#if subtitle}
                <p>{subtitle}</p>
            {/if}
        </div>
    {/if}
    <div class="table-wrapper">
        <table aria-describedby={description ? tableId : undefined}>
            <Header {columns} />
            {#if records}
                <Body {records} {columns} />
            {/if}
        </table>
    </div>
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
