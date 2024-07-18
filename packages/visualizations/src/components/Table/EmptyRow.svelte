<script lang="ts">
    export let label = 'No records found...';
</script>

<tr>
    <div>
        <em>{label}</em>
    </div>
</tr>

<style lang="scss">
    $row-height: 48px;
    tr {
        height: $row-height;
    }
    div {
        position: absolute;
        left: 0;
        right: 0;
        height: $row-height;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
