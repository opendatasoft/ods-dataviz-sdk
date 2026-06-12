<script lang="ts">
    import Pages from './Pages.svelte';
    import CursorPages from './CursorPages.svelte';
    import Numbering from './Numbering.svelte';
    import type { PageSizeSelect } from './types';
    import PageSize from './PageSize.svelte';

    export let kind: 'numbered' | 'cursor' = 'numbered';
    export let current: number;
    export let onPageChange: (page: number) => void;

    // numbered mode
    // eslint-disable-next-line no-undef-init
    export let totalRecords: number | undefined = undefined;
    // eslint-disable-next-line no-undef-init
    export let recordsPerPage: number | undefined = undefined;
    // eslint-disable-next-line no-undef-init
    export let pageSizeSelect: PageSizeSelect | undefined = undefined;
    export let labels: Partial<{
        previousPage: string;
        nextPage: string;
        firstPage: string;
        lastPage: string;
        records: string;
        pageSizeAriaLabel: string;
    }> = {};

    // cursor mode
    /** Number of pages after `current` known to exist (see CursorPagination). */
    export let pagesAhead = 0;
    /**
     * Number of records actually displayed on the current page. Lets cursor mode
     * show an exact "X-Y" range on a partial last page (the total being unknown,
     * it cannot be derived like in numbered mode). Optional: without it, cursor
     * mode assumes a full page.
     */
    // eslint-disable-next-line no-undef-init
    export let displayedRecords: number | undefined = undefined;

    $: isCursor = kind === 'cursor';
    $: perPage = recordsPerPage ?? 10;
    $: totalPages = !isCursor && totalRecords !== undefined ? Math.ceil(totalRecords / perPage) : 0;

    $: rangeStart = perPage * (current - 1) + 1;
    $: rangeEnd = isCursor
        ? rangeStart + (displayedRecords || perPage) - 1
        : Math.min(perPage * current, totalRecords ?? 0);
</script>

<div class="pagination-container">
    <div class="pagination">
        <div class="numbering">
            <Numbering
                current={[rangeStart, rangeEnd]}
                total={isCursor ? undefined : totalRecords}
                recordsLabel={isCursor ? undefined : labels?.records}
            />
        </div>
        <div class="pages">
            {#if isCursor}
                <CursorPages {current} {pagesAhead} {onPageChange} {labels} />
            {:else}
                <Pages {current} {totalPages} {onPageChange} {labels} />
            {/if}
        </div>
        <div class="page-size">
            {#if !isCursor && pageSizeSelect && recordsPerPage !== undefined}
                <PageSize
                    selected={recordsPerPage}
                    {...pageSizeSelect}
                    selectLabel={labels?.pageSizeAriaLabel}
                />
            {/if}
        </div>
    </div>
</div>

<!-- markup (zero or more items) goes here -->
<style lang="scss">
    .pagination-container {
        container: pagination / inline-size;
    }
    .pagination {
        display: grid;
        grid-template-areas: 'numbering pages size';
        grid-template-columns: repeat(3, minmax(0, 1fr));
        align-items: center;
        gap: var(--spacing-100);
        padding: 13px;
        .numbering {
            grid-area: numbering;
        }
        .pages {
            grid-area: pages;
        }
        .page-size {
            grid-area: size;
            justify-self: end;
        }
    }

    @container pagination (max-width: 500px) {
        .pagination {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            display: grid;
            grid-template-areas: 'numbering size' 'pages pages';
        }
    }
</style>
