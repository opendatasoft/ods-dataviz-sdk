<script lang="ts">
    import type { Column } from './types';
    import { format } from './utils';

    export let column: Column;
    export let record: Record<string, unknown>;
    export let offset: number | undefined;
    
    $: ({ cellStyle, dataFormat, fixed } = column);
    $: ( { formatCell, formatRecord = (v: any) => v } =  format[column.dataFormat]);
</script>

<td
    style="
        position: {fixed ? 'sticky' : ''}; 
        left: {fixed ? offset : ''}px;
        {formatCell(dataFormat)}
        {cellStyle && cellStyle(record).cssText};
    "
>
    {formatRecord(record[column.key])}
</td>

<style>
    td {
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
