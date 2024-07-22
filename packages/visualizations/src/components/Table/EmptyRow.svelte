<script lang="ts">
    export let label = 'No records found...';
</script>

<tr>
    <td>
        <em>{label}</em>
    </td>
</tr>

<style lang="scss">
    $row-height: 48px;
    tr {
        height: $row-height;
    }
    td {
        box-sizing: border-box;
        position: absolute;
        left: 0;
        right: 0;
        height: $row-height;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
