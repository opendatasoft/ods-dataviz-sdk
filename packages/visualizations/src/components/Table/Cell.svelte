<script lang="ts">
    export let value: unknown;
</script>

<td>{value}</td>

<style lang="scss">
    :global(.ods-dataviz-sdk-table--default) {
        td {
            padding: var(--spacing-75);
            font-weight: normal;
            text-align: left;
        }
    }
</style>
