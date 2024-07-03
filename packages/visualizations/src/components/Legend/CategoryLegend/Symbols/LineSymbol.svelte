<script lang="ts">
    import type { LineCategoryItem } from 'types';

    export let item: LineCategoryItem;
</script>

<div class:dashed={item.dashed} style="--border-color:{item.borderColor}" />

<style>
    div {
        min-height: 16px;
        min-width: 28px;
        margin-right: 3px;
        background: linear-gradient(var(--border-color), var(--border-color)) no-repeat center/100%
            2px;
        background-position-x: calc(50% - 3px);
    }
    .dashed {
        background: repeating-linear-gradient(
                to right,
                transparent 0 3px,
                var(--border-color) 3px 9px
            )
            no-repeat center/100% 2px;
        background-position-x: calc(50% - 3px);
    }
</style>
