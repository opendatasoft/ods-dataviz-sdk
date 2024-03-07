import {
    Chart as _Chart,
    KpiCard as _KpiCard,
    MarkdownText as _MarkdownText,
    ChoroplethGeoJson as _ChoroplethGeoJson,
    ChoroplethVectorTiles as _ChoroplethVectorTiles,
    ChoroplethSvg as _ChoroplethSvg,
    PoiMap as _PoiMap,
} from '@opendatasoft/visualizations';
import type {
    ChartProps,
    KpiProps,
    MarkdownTextProps,
    ChoroplethGeoJsonProps,
    ChoroplethVectorTilesProps,
    MapPoiProps,
} from '@opendatasoft/visualizations';
import reactifySvelte from 'reactify';

export const Chart = reactifySvelte<ChartProps>(_Chart, 'ods-visualizations-chart');
export const KpiCard = reactifySvelte<KpiProps>(_KpiCard, 'ods-visualizations-kpi');
export const MarkdownText = reactifySvelte<MarkdownTextProps>(
    _MarkdownText,
    'ods-visualizations-md-text'
);
export const ChoroplethGeoJson = reactifySvelte<ChoroplethGeoJsonProps>(
    _ChoroplethGeoJson,
    'ods-visualizations-choropleth'
);
export const ChoroplethVectorTiles = reactifySvelte<ChoroplethVectorTilesProps>(
    _ChoroplethVectorTiles,
    'ods-visualizations-choropleth'
);
export const ChoroplethSvg = reactifySvelte<ChoroplethGeoJsonProps>(
    _ChoroplethSvg,
    'ods-visualizations-choropleth-svg'
);
export const PoiMap = reactifySvelte<MapPoiProps>(_PoiMap, 'ods-visualizations-poi-map');
export type { Props } from 'reactify';
