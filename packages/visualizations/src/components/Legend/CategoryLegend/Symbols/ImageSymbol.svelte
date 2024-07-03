<script lang="ts">
    import type { ImageCategoryItem } from 'types';

    export let item: ImageCategoryItem;
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<img src={item.src} />

<style>
    img {
        width: 16px;
        margin-right: 6px;
        object-fit: contain;
    }
</style>
