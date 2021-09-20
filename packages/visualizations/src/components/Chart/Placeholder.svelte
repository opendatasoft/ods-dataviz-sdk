<script lang="ts">
    export const error: string | null = null;
    export const loading: boolean | null = null;
</script>

<div class="ods-viz__bar-chart--placeholder" />

<style lang="scss">
    @import "../../styles/theme.scss";

    .ods-viz__bar-chart--placeholder {
        background-color: $light-300;
        border: dashed 1px $identity-200;
        height: 330px;
    }
</style>
