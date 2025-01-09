<script lang="ts">
    import Cell from './Cell';
    import ZoomIcon from './ZoomIcon.svelte';
    import type { Column, RowProps, HoverEvent } from './types';

    export let columns: Column[];
    export let rowProps: RowProps | undefined;
    export let record: Record<string, unknown>;
    export let isHovered = false;
    export let setHovered: () => void;

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
    on:mouseenter={rowProps && handleMouseEnter}
    on:mouseleave={rowProps && handleMouseLeave}
    on:focusin={rowProps && handleMouseEnter}
    on:focusout={rowProps && handleMouseLeave}
>
    {#if rowProps?.onClick}
        <td class="button-cell">
            <button
                on:click={rowProps && handleClick}
                aria-label={actionAriaLabel || 'Expand Record'}
            >
                <span class:visually-hidden={!isHovered}>
                    <ZoomIcon />
                </span>
            </button>
        </td>
    {/if}
    {#each columns as column}
        <Cell rawValue={record[column.key]} {column} />
    {/each}
</tr>

<style>
    :global(.ods-dataviz--default tr:last-child td) {
        border-bottom: none;
    }

    :global(.ods-dataviz--default .button-cell button) {
        background-color: transparent;
        color: inherit;
        border-radius: 50%;
        height: 28px;
        width: 28px;
        padding: 6px;
        margin-right: -6px; /* cancels next cell padding */
        border: none;
        box-shadow: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    span {
        width: 100%;
        height: 100%;
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

    :global(.ods-dataviz--default .button-cell) {
        padding: 0;
        padding-left: 6px;
        width: 34px;
    }
</style>
