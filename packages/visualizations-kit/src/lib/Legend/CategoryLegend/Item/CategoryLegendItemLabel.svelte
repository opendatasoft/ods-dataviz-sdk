<script lang="ts">
    interface Props {
        label: string;
    }

    let { label }: Props = $props();
</script>

<div>
    {label}
</div>

<style>
    div {
        color: #565656;
        font-size: 0.8rem;
    }
</style>
