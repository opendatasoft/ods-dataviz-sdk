import type { Feature, FeatureCollection, Position } from 'geojson';
import type { FillLayerSpecification, Popup } from 'maplibre-gl';
import type { Color, ColorsScale } from '../types';

export interface ChoroplethOptions {
    shapes: ChoroplethShapeValue;
    colorsScale?: ColorsScale;
    legend?: MapLegend;
    aspectRatio: number;
    activeShapes?: string[];
    interactive?: boolean;
    emptyValueColor: Color;
    tooltip: { label: ChoroplethTooltipFormatter };
}

export interface MapLegend {
    title?: string;
}

export type ChoroplethTooltipFormatter = ({
    value,
    label,
    key,
}: {
    value?: number;
    label: string;
    key?: string;
}) => string;

export interface ChoroplethDataValue {
    x: string;
    y: number;
}

export interface ChoroplethShapeGeoJsonValue {
    type: 'geojson';
    geoJson: FeatureCollection | null;
}

export interface ChoroplethShapeVectorTilesValue {
    type: 'vtiles';
    url: string;
}

export type ChoroplethShapeValue = ChoroplethShapeGeoJsonValue | ChoroplethShapeVectorTilesValue;

export interface ChoroplethFixedTooltipDescription {
    center: Position;
    description: string;
    popup: Popup;
}

export type ChoroplethRenderTooltipFunction = (f: Feature) => string;

export type ChoroplethLayer = Omit<FillLayerSpecification, 'id' | 'source'>;
