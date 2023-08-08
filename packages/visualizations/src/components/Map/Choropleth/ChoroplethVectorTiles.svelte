<script lang="ts">
    import type { FilterSpecification, SourceSpecification } from 'maplibre-gl';
    import type { ColorScale, Color } from '../../types';
    import {
        getDataBounds,
        mapKeyToColor,
        computeFilterExpression,
        computeBaseLayer,
        computeMatchExpression,
        VOID_BOUNDS,
    } from '../utils';
    import { DEFAULT_COLORS, DEFAULT_COLORSCALE } from '../constants';
    import type {
        ChoroplethDataValue,
        ChoroplethVectorTilesOptions,
        ChoroplethShapeVectorTilesValue,
        MapFilter,
    } from '../types';
    import MapCard from '../MapCard.svelte';
    import Map from '../WebGl/Map.svelte';
    import type { MapPublicInterface } from '../WebGl/map';

    export let data: { value: ChoroplethDataValue[] }; // values, and the key to match
    export let options: ChoroplethVectorTilesOptions; // contains the shapes to display & match

    let shapesTiles: ChoroplethShapeVectorTilesValue;
    let colorScale: ColorScale;

    let aspectRatio: number | undefined;
    let filter: MapFilter | undefined;
    let title: string | undefined;
    let subtitle: string | undefined;
    let description: string | undefined;

    // Used to apply a chosen color for shapes without values (default: #cccccc)
    let emptyValueColor: Color;

    // Used to determine the shapes key
    let matchKey: string;
    $: matchKey = shapesTiles.key;

    $: ({
        shapesTiles,
        colorScale = DEFAULT_COLORSCALE,
        aspectRatio,
        emptyValueColor = DEFAULT_COLORS.Default,
        filter,
        title,
        subtitle,
        description,
    } = options);

    // MapLibre default zoom
    const MIN_ZOOM = 0;
    const MAX_ZOOM = 22;

    const mapId = Math.floor(Math.random() * 1000);
    const sourceId = `shape-source-${mapId}`;
    const layerId = `shape-layer-${mapId}`;

    let publicInterface: MapPublicInterface;
    let fillColor: FilterSpecification;

    const getPublicInterface = (e: CustomEvent<{ publicInterface: MapPublicInterface }>) => {
        ({ publicInterface } = e.detail);
    };

    $: if (data.value.length > 0) {
        const values = data.value;
        const dataBounds = getDataBounds(values);
        const colors = mapKeyToColor(values, dataBounds, colorScale, emptyValueColor);
        fillColor = computeMatchExpression(colors, matchKey, emptyValueColor);
    }
    $: if (shapesTiles.url && publicInterface) {
        const source: SourceSpecification = {
            type: 'vector',
            tiles: [shapesTiles.url],
            minzoom: shapesTiles.minZoom || MIN_ZOOM,
            maxzoom: shapesTiles.maxZoom || MAX_ZOOM,
        };
        publicInterface.addSource({ sourceId, source });
    }
    $: if (shapesTiles.url && fillColor && publicInterface) {
        const baseLayer = computeBaseLayer(fillColor, DEFAULT_COLORS.ShapeOutline);
        const layer = {
            ...baseLayer,
            'source-layer': shapesTiles.layer,
        };
        publicInterface.addLayer({ layerId, sourceId, layer });
    }
    $: if (filter && publicInterface) {
        const filterExpression = computeFilterExpression(filter);
        publicInterface.setFilter({ layerId, filterExpression });
    }
</script>

<MapCard {title} {subtitle} {description} {aspectRatio} {mapId}>
    <Map on:load={getPublicInterface} />
</MapCard>

<style>
</style>
