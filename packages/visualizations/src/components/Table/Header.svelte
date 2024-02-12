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
