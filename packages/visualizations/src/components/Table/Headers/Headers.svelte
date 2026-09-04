<script lang="ts">
    import { getContext, onDestroy } from 'svelte';
    import type { Column, StickyStores } from '../types';
    import { getStickyClasses, getStickyOffset } from '../sticky';
    import { ROW_NUMBER_COLUMN_KEY } from '../constants';
    import Th from './Th.svelte';

    export let columns: Column[];
    export let extraButtonColumn = false;
    export let extraButtonColumnLabel: string | undefined;

    export let showRowNumbers = false;
    export let rowNumberLabel = 'Row number';
    export let showFieldTypeIcons = false;

    const { 
        stickyColumnsWidth,
        stickyColumnsOffset,
        isHorizontallyScrolled,
        lastStickyColumn,
        isVerticallyScrolled,
        stickyHeader
    } =
        getContext<StickyStores>('sticky-stores');

    // Measuring is done via ResizeObserver rather than a one-off reactive read, since a host's
    // CSS can change this column's rendered width after the initial measurement (e.g. it only
    // applies once another stylesheet loads, or once layout settles post-scroll).
    let rowNumberHeaderEl: HTMLElement | undefined;
    let resizeObserver: ResizeObserver | undefined;

    $: {
        resizeObserver?.disconnect();
        if (rowNumberHeaderEl) {
            const el = rowNumberHeaderEl;
            resizeObserver = new ResizeObserver(() => {
                // Only updates once registered by Table.svelte's reset (mirrors Th.svelte's guard)
                if ($stickyColumnsWidth.has(ROW_NUMBER_COLUMN_KEY)) {
                    stickyColumnsWidth.updateColumn(ROW_NUMBER_COLUMN_KEY, el.clientWidth);
                }
            });
            resizeObserver.observe(el);
        }
    }

    onDestroy(() => resizeObserver?.disconnect());

    /* Self-heals when Table.svelte resets this column's width to 0 without the element's own
       size actually changing (e.g. an unrelated re-render on window resize) — the
       ResizeObserver above only fires on a real size change, so nothing else catches this.
       Guarded to avoid looping, since `updateColumn` always emits. */
    $: {
        const registeredWidth = $stickyColumnsWidth.get(ROW_NUMBER_COLUMN_KEY);
        if (
            rowNumberHeaderEl &&
            registeredWidth !== undefined &&
            registeredWidth !== rowNumberHeaderEl.clientWidth
        ) {
            stickyColumnsWidth.updateColumn(ROW_NUMBER_COLUMN_KEY, rowNumberHeaderEl.clientWidth);
        }
    }
</script>

<thead
    class:sticky-header={$stickyHeader}
    class:isVerticallyScrolled={$stickyHeader && $isVerticallyScrolled}
>
    <tr>
        {#if extraButtonColumn}
            <Th {extraButtonColumnLabel} />
        {/if}
        {#if showRowNumbers}
            <th
                bind:this={rowNumberHeaderEl}
                style={getStickyOffset($stickyColumnsOffset.get(ROW_NUMBER_COLUMN_KEY))}
                class={`row-number-header ${getStickyClasses({
                    columnKey: ROW_NUMBER_COLUMN_KEY,
                    sticky: true,
                    scrolled: $isHorizontallyScrolled,
                    lastStickyColumn: $lastStickyColumn,
                })}`}
                scope="col"
                aria-label={rowNumberLabel}
            />
        {/if}
        {#each columns as column (column.key)}
            <Th {column} {showFieldTypeIcons} />
        {/each}
    </tr>
</thead>

<style lang="scss">
    @import '../sticky';
    .row-number-header {
        width: 3rem;
        /* `min-width` always wins over a smaller `width` (see Row.svelte's `.button-cell.sticky`
           for why) — without this, a host's generic `th { min-width: ... }` forces the whole
           column wider than intended, since header and body share one column width. */
        min-width: 3rem;
    }
</style>
