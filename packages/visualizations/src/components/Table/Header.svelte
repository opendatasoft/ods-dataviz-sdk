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
