<script lang="ts">
    import Pages from "./Pages.svelte";
    import Numbering from "./Numbering.svelte";
    // import PerPage from "./PerPage.svelte";
    import type { TableOptions } from '../types';

    export let onChangePage: Required<TableOptions>['pages']['onChangePage'];
    export let totalRecords: number;
    export let recordsPerPage: number;
    export let initial: number;
    
    let current = initial;

    const setPage = async (page: number) => {
        onChangePage(page);
        current = page;
    };

    // "floor" because it's ceil but starts at 0 
    const totalPages = Math.floor(totalRecords / recordsPerPage);
</script>
<div class="pagination">
    <div class="numbering">
        <Numbering
             current={[recordsPerPage * (current - 1) +1, recordsPerPage * current ]}
             total={totalRecords}
        />
    </div>
    <div class="pages">
        <Pages {current} {totalPages} {setPage} />
    </div>
    <!-- FIXME Place holder for number per page -->
    <div class="spacer" />
</div>

<style lang="scss">
    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    :global(.ods-dataviz-sdk-table--default) {
        .pages {
            flex-grow: 1;
        }

        /* FIXME .spacer is a temporary stub for the number per page */
        .numbering, .spacer {
            flex: 0 1 120px;
        }

        .numbering {
            color: #898d92; 
        }
    }
</style>

<!-- markup (zero or more items) goes here -->