<script lang="ts">
    import type { Column } from './types';
    import { formatCell } from './utils';

    export let column: Column;
    export let record: Record<string, unknown>;
    export let offset: number | undefined;
</script>

<td
    style="
        position: {column.fixed ? 'sticky' : ''}; 
        left: {column.fixed ? offset : ''}px;
    "
>
    {@html formatCell(column, record)}
</td>

<style>
    td {
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
