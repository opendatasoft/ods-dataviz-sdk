<script lang="ts">
</script>

<select on:change>
    {#each [10, 20, 50] as number}
        <option label={number.toString()} value={number} />
    {/each}
</select>

<!-- markup (zero or more items) goes here -->

<style>
    /* your styles go here */
</style>
