<script lang="ts">
    import type { PageSizeOption } from "./types";

    export let options: PageSizeOption[];
    export let setPageSize: (size: number) => void;

    let selected: PageSizeOption;
</script>

<select bind:value={selected} on:change={() => setPageSize(selected.value)}>
    {#each options as option}
        <option label={option.label} value={option.value} />
    {/each}
</select>

<style>
    /* your styles go here */
</style>
