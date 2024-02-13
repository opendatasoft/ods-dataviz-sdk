<script lang="ts">
    import type { Column } from './types';

    export let columns: Column[];
</script>

<thead>
    <tr>
        {#each columns as column}
            <th class={`table-header--${column.dataFormat}`}>
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
            &.table-header--number {
                text-align: right;
            }
        }
    }
</style>
