<script lang="ts">
    export let data: any;
    export let options: Array<{ label: string; value: any }>;

    let filterValue: { field: string; value: string };

    $: data.filter(filterValue);
</script>

<select name="filter" id="filter" bind:value={filterValue}>
    {#each options as option}
        <option value={option.value}>{option.label}</option>
    {/each}
</select>

<p>{JSON.stringify(filterValue)}</p>

<style>
    /* your styles go here */
</style>
