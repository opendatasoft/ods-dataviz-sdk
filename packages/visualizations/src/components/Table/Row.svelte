<script lang="ts">
    import CellContent from './Cell/CellContent.svelte';
    import Td from './Cell/Td.svelte';
    import ZoomIcon from './ZoomIcon.svelte';
    import type { Column, RowProps, HoverEvent, TableOptions } from './types';

    export let columns: Column[];
    export let rowProps: RowProps | undefined;
    export let rowClassName: TableOptions['rowClassName'];
    export let emptyValueLabel: string | undefined;
    export let record: Record<string, unknown>;
    export let isHovered = false;
    export let setHovered: () => void;
    export let rowIndex = 0;
    export let rowOffset = 0;
    export let showRowNumbers = false;

    $: ({ onClick, onMouseEnter, onMouseLeave, actionAriaLabel } = rowProps || {});
    $: handleMouseEnter = (e: HoverEvent<HTMLTableRowElement>) => {
        if (onMouseEnter) {
            onMouseEnter(record, e);
        }
        setHovered();
    };
    $: handleMouseLeave = (e: HoverEvent<HTMLTableRowElement>) => {
        if (onMouseLeave) {
            onMouseLeave(record, e);
        }
    };
    $: handleClick = (e: HoverEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(record, e);
        }
    };
</script>

<tr
    class={rowClassName?.(record) || undefined}
    on:mouseenter={rowProps && handleMouseEnter}
    on:mouseleave={rowProps && handleMouseLeave}
    on:focusin={rowProps && handleMouseEnter}
    on:focusout={rowProps && handleMouseLeave}
>
    {#if rowProps?.onClick}
        <Td>
            <button
                on:click={rowProps && handleClick}
                aria-label={actionAriaLabel || 'Expand Record'}
            >
                <span class:visually-hidden={!isHovered}>
                    <ZoomIcon />
                </span>
            </button>
        </Td>
    {/if}
    {#if showRowNumbers}
        <Td rowNumber>{rowOffset + rowIndex + 1}</Td>
    {/if}
    {#each columns as column}
        <Td {column}>
            <CellContent {record} {column} {emptyValueLabel} />
        </Td>
    {/each}
</tr>

<style>
    :global(.ods-dataviz--default tr:last-child td),
    :global(.ods-dataviz--default tr:last-child th.row-header-cell) {
        border-bottom: none;
    }

    :global(.ods-dataviz--default .button-cell button) {
        background-color: transparent;
        color: inherit;
        border-radius: 50%;
        height: 28px;
        width: 28px;
        padding: 6px;
        border: none;
        box-shadow: none;
    }

    :global(.ods-dataviz--default .button-cell.sticky) {
        padding: 0 6px;
        /* Defeats a host's generic `th, td { min-width: ... }` (e.g. platform's 75px) —
           `min-width` always wins over a smaller `width`/content size regardless of
           specificity, so without this the column is forced far wider than the icon needs.
           This rule already applies to both the header and body button-cell via :global(). */
        min-width: 0;
    }

    :global(.ods-dataviz--default .button-cell.isHorizontallyScrolled.isLastSticky) {
        border-inline-end: 1px solid var(--border-color);
    }

    /* Hides visually but leaves it accessible by kb/sr */
    .visually-hidden:not(:focus):not(:active) {
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }

    :global(.ods-dataviz--default .button-cell button:hover),
    :global(.ods-dataviz--default .button-cell button:focus-visible) {
        background-color: lightgray;
        cursor: pointer;
    }
</style>
