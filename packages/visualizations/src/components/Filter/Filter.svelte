<script lang="ts">
    export let data: any;
    export let options;

    const filters = ['Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté'];

    let filterValue: string;

    $: data.filter(filterValue);
</script>

<select name="filter" id="filter" bind:value={filterValue}>
    {#each filters as filter}
        <option value={filter}>{filter}</option>
    {/each}
</select>

<p>{filterValue}</p>

<style>
    /* your styles go here */
</style>
