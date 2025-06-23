<script lang="ts">
    import type { BoxCategoryItem } from 'components/Legend/types';

    export let item: BoxCategoryItem;
</script>

<div style="--box-color: {item.color}; --border-color:{item.borderColor}" />

<style>
    div {
        min-height: 16px;
        min-width: 28px;
        border-radius: 3px;
        background: var(--box-color);
        border: 1px solid var(--border-color);
    }
</style>
