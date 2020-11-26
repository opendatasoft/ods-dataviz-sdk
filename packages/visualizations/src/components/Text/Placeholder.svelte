<script lang="ts">
    const barsPercentages = [90, 100, 85, 75, 90, 70, 90, 100, 85, 75, 90, 50];
</script>

<div class="placeholder--text">
    {#each barsPercentages as percentage (percentage)}
        <div
            class="placeholder--text__bar"
            style="width: {percentage}%"
        />
    {/each}
</div>

<style>
    .placeholder--text {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
    }

    .placeholder--text__bar {
        background-color: #CBD2DB; /* $light-400 */
        height: 20px;
    }

    .placeholder--text__bar:not(:last-child) {
            margin-bottom: 6px; /* $spacing-50 */
    }
</style>
