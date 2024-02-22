<script lang="ts">
    import type { Column } from './types';

    export let columns: Column[];
</script>

<thead>
    <tr>
        {#each columns as column}
            <th>
                {column.title}
            </th>
        {/each}
    </tr>
</thead>

<style lang="scss">
    :global(.ods-dataviz-sdk-table--default) {
        :global(thead) {
            border-bottom: 1px solid var(--border-color);
        }
        :global(th) {
            padding: var(--spacing-75);
            font-weight: normal;
            text-align: left;
        }
    }
</style>
