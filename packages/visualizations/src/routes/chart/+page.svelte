<script lang="ts">
import Chart from '$lib/Chart/Chart.svelte';
import { ChartSeriesType } from '$lib/Chart/types';
import type { Source } from '$lib/types';

export const COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
};

export const defaultSource: Source = {
    href: 'https://data.opendatasoft.com/explore/dataset/arbresremarquablesparis2011%40public/table/',
};

const data = {
    loading: false,
    value: [
        { x: 0, y: -2400, z: 1410 },
        { x: 1, y: -1400, z: 2750 },
        { x: 2, y: null, z: 3570 },
        { x: 3, y: -3000, z: null },
        { x: 4, y: -1800.47, z: null },
        { x: 5, y: -7780, z: -181 },
    ],
};
const options = {
    labelColumn: 'x',
    source: defaultSource,
    series: [
        {
            label: 'Green',
            type: ChartSeriesType.Line as const,
            valueColumn: 'y',
            tension: 0,
            borderColor: COLORS.green,
        },
        {
            label: 'Blue',
            type: ChartSeriesType.Line as const,
            valueColumn: 'z',
            tension: 0,
            borderColor: COLORS.blue,
        },
    ],
    axis: {
        x: {
            display: true,
            type: 'linear' as const,
            title: {
                display: true,
                text: 'Date de plantation',
                align: 'center' as const,
            },
            gridLines: {
                display: false,
            },
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'Hello / km',
                align: 'center' as const,
            },
            gridLines: {
                display: true,
            },
        },
    },
    title: {
        text: 'Line chart with title, axis, grid and dots',
    },
    legend: {
        display: true,
    },
};
</script>

<div style="display: flex; align-items: center; justify-content: center;">
	<div style="width: 60vw">
		<Chart {data} {options} />
	</div>
</div>
