<script lang="ts">
    export let current: [number, number];
    // eslint-disable-next-line no-undef-init
    export let total: number | undefined = undefined;
    export let recordsLabel: string | undefined;
</script>

<span>
    {#if total !== undefined}
        <b>{current[0]}-{current[1]}/{total}</b>
    {:else}
        <b>{current[0]}-{current[1]}</b>
    {/if}
    {recordsLabel || ''}
</span>

<style></style>
