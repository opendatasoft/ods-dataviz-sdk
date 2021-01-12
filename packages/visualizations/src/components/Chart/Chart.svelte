<script lang="ts" context="module">
    import * as ChartJs from 'chart.js';

    ChartJs.Chart.register.apply(
        null,
        Object.values(ChartJs).filter((chartClass) => (chartClass as any).id)
    );

    function chartJs(node: HTMLCanvasElement, config: ChartJs.ChartConfiguration) {
        const ctx = node.getContext('2d');
        const chart = new ChartJs.Chart(ctx, config);
        return {
            update(config: ChartJs.ChartConfiguration) {
                chart.update();
            },
            destroy() {
                chart.destroy();
            },
        };
    }
</script>

<script lang="ts">
    import type { Async } from '../../types';
    import Placeholder from './Placeholder.svelte';
    import type { ChartOptions, DataFrame } from '../types';
    export let data: Async<DataFrame>;
    export let options: ChartOptions;

    let chartConfig: ChartJs.ChartConfiguration = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [],
        },
        options: {},
    };

    $: {
        chartConfig.type = options.type;
        chartConfig.options.aspectRatio = options.aspectRatio;
    }

    $: {
        chartConfig.data.labels = data.value.map((entry) => entry[options.xAxis]);
        chartConfig.data.datasets = [
            {
                label: options.label,
                data: data.value.map((entry) => entry[options.yAxis]),
                backgroundColor: options.colorConfiguration.colors,
            },
        ];
    }
</script>

<style>
    .chart-container {
        position: relative;
        height: 100%;
        width: 100%;
    }
</style>

<div class="chart-container">
    {#if data.loading}
        Loading...
    {:else}
        {#if data.value}
            <canvas use:chartJs={chartConfig} />
        {:else}
            <Placeholder />
        {/if}
        {#if data.error}Error : {JSON.stringify(data.error)}{/if}
    {/if}
</div>
