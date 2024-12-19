<script lang="ts">
    interface Props {
        current: [number, number];
        total: number;
        recordsLabel: string | undefined;
    }

    let { current, total, recordsLabel }: Props = $props();
</script>

<span>
    <b>{current[0]}-{current[1]}/{total}</b>
    {recordsLabel || ''}
</span>

<!-- markup (zero or more items) goes here -->
<style></style>
