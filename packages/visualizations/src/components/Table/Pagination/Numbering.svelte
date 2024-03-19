<script lang="ts">
    export let current: [number, number];
    export let total: number;
</script>

<span>
    <b>{current[0]}-{current[1]}/{total}</b> records
</span>

<style>
    span {
       color: #898d92; 
    }
</style>

<!-- markup (zero or more items) goes here -->