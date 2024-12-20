<script lang="ts">
    import type { ImageCategoryItem } from '$lib/Legend/types';

    interface Props {
        item: ImageCategoryItem;
    }

    let { item }: Props = $props();
</script>

<!-- svelte-ignore a11y_missing_attribute -->
<img src={item.src} />

<style>
    img {
        width: 16px;
        margin-right: 6px;
        object-fit: contain;
    }
</style>
