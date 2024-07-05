<script lang="ts">
    import Pages from './Pages.svelte';
    import Numbering from './Numbering.svelte';
    // import PerPage from "./PerPage.svelte";
    import type { PageSizeSelect, Pagination } from './types';
    import PageSize from './PageSize.svelte';

    export let current: number;
    export let onPageChange: (page: number) => void;
    export let totalRecords: number;
    export let recordsPerPage: number;
    export let pageSizeSelect: PageSizeSelect;
    export let labels: Pagination['labels'] = {};

    $: totalPages = Math.ceil(totalRecords / recordsPerPage);
</script>

<div class="pagination-container">
    <div class="pagination">
        <div class="numbering">
            <Numbering
                current={[
                    recordsPerPage * (current - 1) + 1,
                    Math.min(recordsPerPage * current, totalRecords),
                ]}
                total={totalRecords}
                recordsLabel={labels?.records}
            />
        </div>
        <div class="pages">
            <Pages {current} {totalPages} {onPageChange} {labels} />
        </div>
        <div class="page-size">
            {#if pageSizeSelect}
                <PageSize selected={recordsPerPage} {...pageSizeSelect} />
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
            display: flex;
            flex-direction: row-reverse;
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
