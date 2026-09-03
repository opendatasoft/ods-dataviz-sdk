<script lang="ts">
    import Td from './Td.svelte';
    import type { Column } from '../types';

    export let column: Column | null = null;
</script>

<Td {column}>
    <div class="cell-content-placeholder">
        <div class="skeleton" />
    </div>
</Td>

<style>
    .cell-content-placeholder {
        padding: var(--spacing-75);
    }

    .skeleton {
        min-height: 21px;
        width: 100%;
        background-color: #f6f8fb;
        border-radius: 3px;
        overflow: hidden;
        position: relative;
    }
    .skeleton::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 60%;
        height: 100%;
        background-color: #cbd2db;
        filter: blur(26px);
        animation: move 800ms linear 0s infinite alternate both;
    }

    @keyframes move {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(200%);
        }
    }
</style>
