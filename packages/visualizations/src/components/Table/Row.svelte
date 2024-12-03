<script lang="ts">
    import Cell from './Cell';
    import ZoomIcon from './ZoomIcon.svelte';
    import type { Column, RowProps } from './types';

    export let columns: Column[];
    export let rowProps: RowProps | undefined;
    export let record: Record<string, unknown>;

    let isRowHovered = false;
    $: ({ onClick, onMouseEnter, onMouseLeave, actionAriaLabel } = rowProps || {});
    $: handleMouseEnter = () => {
        if (onMouseEnter) {
            onMouseEnter(record);
        }
        isRowHovered = true;
    };
    $: handleMouseLeave = () => {
        if (onMouseLeave) {
            onMouseLeave(record);
        }
        isRowHovered = false;
    };
    $: handleClick = () => {
        if (onClick) {
            onClick(record);
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
                <span class:visually-hidden={!isRowHovered}>
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
    :global(.ods-dataviz--default tr) {
        border-bottom: 1px solid var(--border-color);
    }

    :global(.ods-dataviz--default tr:last-child) {
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
