<script lang="ts">
    export let current: [number, number];
    export let total: number;
    export let recordsLabel = '';
</script>

<span>
    <b>{current[0]}-{current[1]}/{total}</b>
    {recordsLabel}
</span>

<!-- markup (zero or more items) goes here -->
<style></style>
