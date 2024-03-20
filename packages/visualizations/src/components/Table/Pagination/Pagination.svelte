<script lang="ts">
    import Pages from './Pages.svelte';
    import Numbering from './Numbering.svelte';
    // import PerPage from "./PerPage.svelte";
    import type { Pagination } from '../types';

    export let onChangePage: Pagination['onChangePage'];
    export let totalRecords: number;
    export let recordsPerPage: number;
    export let initial: number;

    $: current = initial;

    const setPage = (page: number) => {
        onChangePage(page);
        current = page;
    };

    $: totalPages = Math.ceil(totalRecords / Math.min(recordsPerPage, totalRecords));
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
        <Pages {current} {totalPages} {setPage} />
    </div>
    <!-- FIXME Place holder for number per page -->
    <div class="spacer" />
</div>

<!-- markup (zero or more items) goes here -->
<style lang="scss">
    .pagination {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-100) 0;
    }

    :global(.ods-dataviz--default) {
        .pages {
            flex-grow: 1;
        }

        .numbering,
        .spacer {
            flex: 0 1 120px;
        }
    }

    :global(.ods-dataviz--default) {
        .pages {
            flex-grow: 1;
        }

        .numbering, .spacer {
            flex: 0 1 120px;
        }
    }

    :global(.ods-dataviz-sdk-table--default) {
        .pages {
            flex-grow: 1;
        }

        .numbering,
        .spacer {
            flex: 0 1 120px;
        }
    }
</style>
