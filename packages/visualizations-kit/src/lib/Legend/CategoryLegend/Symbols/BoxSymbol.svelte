<script lang="ts">
    import type { BoxCategoryItem } from '$lib/Legend/types';

    interface Props {
        item: BoxCategoryItem;
    }

    let { item }: Props = $props();
</script>

<div style="--box-color: {item.color}; --border-color:{item.borderColor}"></div>

<style>
    div {
        min-height: 16px;
        min-width: 28px;
        border-radius: 3px;
        background: var(--box-color);
        border: 1px solid var(--border-color);
        margin-right: 6px;
    }
</style>
