<script lang="ts">
    import Pages from './Pages.svelte';
    import Numbering from './Numbering.svelte';
    // import PerPage from "./PerPage.svelte";
    import type { PageSizeSelect } from './types';
    import PageSize from './PageSize.svelte';

    export let current: number;
    export let pageSizeSelect: PageSizeSelect | undefined;
    export let onPageChange: (page: number) => void;
    export let totalRecords: number;
    export let recordsPerPage: number;

    $: totalPages = Math.ceil(totalRecords / recordsPerPage);
</script>

<div class="pagination">
    <div class="numbering">
        <Numbering
            current={[
                recordsPerPage * (current - 1) + 1,
                Math.min(recordsPerPage * current, totalRecords),
            ]}
            total={totalRecords}
        />
    </div>
    <div class="pages">
        <Pages {current} {totalPages} {onPageChange} />
    </div>
    <div class="page-size">
        {#if pageSizeSelect}
            <PageSize selected={recordsPerPage} {...pageSizeSelect} />
        {/if}
    </div>
</div>

<!-- markup (zero or more items) goes here -->
<style lang="scss">
    .pagination {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 13px 0;
    }

    :global(.ods-dataviz--default) {
        .pages {
            flex-grow: 1;
        }

        .numbering,
        .page-size {
            flex: 0 1 120px;
        }
    }

    :global(.ods-dataviz-sdk-table--default) {
        .pages {
            flex-grow: 1;
        }

        .numbering,
        .page-size {
            flex: 0 1 120px;
        }
    }

    :global(.ods-dataviz-sdk-table--default) {
        .pages {
            flex-grow: 1;
        }

        .numbering,
        .page-size {
            flex: 0 1 120px;
        }
    }
</style>
