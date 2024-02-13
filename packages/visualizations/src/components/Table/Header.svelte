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
        thead {
            border-bottom: 2px solid var(--header-border-bottom-color);
        }
        th {
            padding: var(--spacing-75);
            font-weight: normal;
            text-align: left;
            color: var(--header-text-color);
            background-color: var(--header-background-color);
        }
    }
</style>
