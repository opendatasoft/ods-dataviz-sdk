<script lang="ts">
import ChoroplethGeoJson from '$lib/ChoroplethMap/WebGl/ChoroplethGeoJson.svelte';
import ChoroplethVectorTiles from '$lib/ChoroplethMap/WebGl/ChoroplethVectorTiles.svelte';
import ChoroplethSvg from '$lib/ChoroplethMap/Svg/Choropleth.svelte';

import { shapes, dataReg, shapesTiles } from './data';
import { type ChoroplethVectorTilesOptions, type ChoroplethTooltipFormatter, type TooltipParams } from '$lib/ChoroplethMap/types';
import { ColorScaleTypes } from '$lib/types';

const defaultLabelCallback: ChoroplethTooltipFormatter = ({ label, value }: TooltipParams) =>
    `<b>${label}:</b> ${value}`;

const options = {
    shapes,
    emptyValueColor: 'red',
    tooltip: {
        formatter: defaultLabelCallback,
    },
    aspectRatio: 1,
    attribution: 'Testing attribution',
    description: 'Accessible description',
};

const data = {
    value: [
        { x: 'France', y: 60 },
        { x: 'Île de France', y: 35 },
        { x: 'Corsica', y: 95 },
    ],
}

const regData = {
        value: dataReg,
    };
const vectorOptions: ChoroplethVectorTilesOptions = {
    bbox: [-17.529298, 38.79776, 23.889159, 52.836618],
    shapesTiles,
    colorScale: {
        type: ColorScaleTypes.Gradient,
        colors: {
            start: '#bcf5f9',
            end: '#0229bf',
        },
    },
    legend: {
        title: 'I Am Legend',
    },
    aspectRatio: 1,
    activeShapes: ['11', '93'],
    emptyValueColor: 'red',
    tooltip: {
        formatter: defaultLabelCallback,
    },
};

const scales: { [key: string]: ColorScale | undefined } = {
    none: undefined,
    blue: {
        type: ColorScaleTypes.Gradient,
        colors: {
            start: '#bcf5f9',
            end: '#0229bf',
        },
    },
    grey: {
        type: ColorScaleTypes.Gradient,
        colors: {
            start: '#333333',
            end: '#CCCCCC',
        },
    },
};

// I know data is plural already!
const datasets: { [key: number]: { value: Array<{ x: string; y: number }> } } = {
    1: {
        value: [
            { x: 'France', y: 60 },
            { x: 'Île de France', y: 35 },
            { x: 'Corsica', y: 95 },
        ],
    },
    2: {
        value: [
            { x: 'France', y: 20 },
            { x: 'Île de France', y: 75 },
            { x: 'Corsica', y: 30 },
        ],
    },
};


</script>
<div
style={`
    width: '50%';
    height: '100px';
    width: '100px';
    margin: 'auto';
    border: '1px solid black';
`}
>
    <ChoroplethGeoJson {data} {options} />
</div>
<div
style={`
    width: '50%';
    height: '100px';
    width: '100px';
    margin: 'auto';
    border: '1px solid black';
`}
>
    <ChoroplethVectorTiles data={regData} options={vectorOptions} />
</div>
<div
style={`
    width: '50%';
    height: '100px';
    width: '100px';
    margin: 'auto';
    border: '1px solid black';
`}
>
    <ChoroplethSvg {data} {options}/>
</div>