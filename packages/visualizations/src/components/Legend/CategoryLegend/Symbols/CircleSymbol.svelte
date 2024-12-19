<script lang="ts">
    import type { CircleCategoryItem } from 'components/Legend/types';

    interface Props {
        item: CircleCategoryItem;
    }

    let { item }: Props = $props();
</script>

<div style="--box-color: {item.color}; --border-color:{item.borderColor}"></div>

<style>
    div {
        min-height: 16px;
        min-width: 16px;
        border-radius: 50%;
        background: var(--box-color);
        border: 1px solid var(--border-color);
        margin-right: 6px;
    }
</style>
