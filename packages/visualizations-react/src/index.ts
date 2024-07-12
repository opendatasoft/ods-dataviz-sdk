import '@opendatasoft/visualizations/dist/index.css';

import {
    Chart as _Chart,
    KpiCard as _KpiCard,
    MarkdownText as _MarkdownText,
    ChoroplethGeoJson as _ChoroplethGeoJson,
    ChoroplethVectorTiles as _ChoroplethVectorTiles,
    ChoroplethSvg as _ChoroplethSvg,
    PoiMap as _PoiMap,
    Table as _Table,
} from '@opendatasoft/visualizations';
import type {
    ChartProps,
    KpiProps,
    MarkdownTextProps,
    ChoroplethGeoJsonProps,
    ChoroplethVectorTilesProps,
    PoiMapProps,
    TableProps,
} from '@opendatasoft/visualizations';
import reactifySvelte from 'reactify';


export const Chart = reactifySvelte<ChartProps>(_Chart, 'chart');
export const KpiCard = reactifySvelte<KpiProps>(_KpiCard, 'kpi');
export const MarkdownText = reactifySvelte<MarkdownTextProps>(
    _MarkdownText,
    'md-text'
);
export const ChoroplethGeoJson = reactifySvelte<ChoroplethGeoJsonProps>(
    _ChoroplethGeoJson,
    'choropleth'
);
export const ChoroplethVectorTiles = reactifySvelte<ChoroplethVectorTilesProps>(
    _ChoroplethVectorTiles,
    'choropleth'
);
export const ChoroplethSvg = reactifySvelte<ChoroplethGeoJsonProps>(
    _ChoroplethSvg,
    'choropleth-svg'
);
export const PoiMap = reactifySvelte<PoiMapProps>(_PoiMap, 'poi-map');
export const Table = reactifySvelte<TableProps>(_Table, 'table');
