<script lang="ts">
    export const error: string = null;
    export const loading: boolean = null;

    const barsPercentages = [90, 100, 85, 75, 90, 70, 90, 100, 85, 75, 90, 50];
</script>

<div class="ods-viz__text--placeholder">
    {#each barsPercentages as percentage (percentage)}
        <div
            class="ods-viz__text__line--placeholder"
            style="width: {percentage}%"
        />
    {/each}
</div>

<style lang="scss">
    @import "./styles/theme.scss";

    .ods-viz__text--placeholder {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
    }

    .ods-viz__text__line--placeholder {
        background-color: $light-400;
        height: 20px;
        &:not(:last-child) {
            margin-bottom: $spacing-50;
        }
    }
</style>
