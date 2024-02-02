<script lang="ts">
    import type { Column } from './types';

    export let columns: Column[];
</script>

<colgroup>
    {#each columns as column}
        <col style="width: {column.width || 'auto'}px;">
    {/each}
</colgroup>

<style>
</style>