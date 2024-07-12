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
    // eslint-disable-next-line no-undef-init
    export let pageSizeSelect: PageSizeSelect | undefined = undefined;
    export let labels: Pagination['labels'] = {};

    $: totalPages = Math.ceil(totalRecords / recordsPerPage);
</script>

<div class="ods-viz-pagination">
    <div class="ods-viz-pagination-grid">
        <div class="ods-viz-pagination-numbering">
            <Numbering
                current={[
                    recordsPerPage * (current - 1) + 1,
                    Math.min(recordsPerPage * current, totalRecords),
                ]}
                total={totalRecords}
                recordsLabel={labels?.records}
            />
        </div>
        <div class="ods-viz-pagination-pages">
            <Pages {current} {totalPages} {onPageChange} {labels} />
        </div>
        <div class="ods-viz-pagination-page-size">
            {#if pageSizeSelect}
                <PageSize selected={recordsPerPage} {...pageSizeSelect} />
            {/if}
        </div>
    </div>
</div>

<!-- markup (zero or more items) goes here -->
<style lang="scss">
    @import 'variables';
    .ods-viz-pagination {
        container: pagination / inline-size;
    }
    .ods-viz-pagination-grid {
        display: grid;
        grid-template-areas: 'numbering pages size';
        grid-template-columns: repeat(3, minmax(0, 1fr));
        align-items: center;
        gap: $spacing-100;
        padding: $spacing-100;

    }
    .ods-viz-pagination-numbering {
        grid-area: numbering;
    }

    .ods-viz-pagination-pages {
        grid-area: pages;
    }
    .ods-viz-pagination-page-size {
        grid-area: size;
        justify-self: end;
    }

    @container pagination (max-width: 500px) {
        .ods-viz-pagination-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            display: grid;
            grid-template-areas: 'numbering size' 'pages pages';
        }
    }
</style>
