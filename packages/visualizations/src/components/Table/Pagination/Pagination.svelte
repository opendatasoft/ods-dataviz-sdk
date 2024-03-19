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
    let perPage = recordsPerPage;

    const setPage = async (page: number) => {
        onChangePage(page);
        current = page;
    };

    const totalPages = Math.ceil(totalRecords / recordsPerPage);
</script>
<div>
    <div class="numbering">
        <Numbering
             current={[perPage * (current - 1) +1, perPage * current ]}
             total={totalRecords}
        />
    </div>
    <div class="pages">
        <Pages {current} {totalPages} {setPage} />
    </div>
    <!-- Place holder for number per page -->
    <div class="spacer" />
</div>

<style>
    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .pages {
        flex-grow: 1;
    }

    .numbering, .spacer {
        flex: 0 1 120px;
    }
</style>

<!-- markup (zero or more items) goes here -->