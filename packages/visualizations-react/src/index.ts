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


export const Chart = reactifySvelte<ChartProps>(_Chart);
export const KpiCard = reactifySvelte<KpiProps>(_KpiCard);
export const MarkdownText = reactifySvelte<MarkdownTextProps>(_MarkdownText);
export const ChoroplethGeoJson = reactifySvelte<ChoroplethGeoJsonProps>(_ChoroplethGeoJson);
export const ChoroplethVectorTiles = reactifySvelte<ChoroplethVectorTilesProps>(_ChoroplethVectorTiles,);
export const ChoroplethSvg = reactifySvelte<ChoroplethGeoJsonProps>(_ChoroplethSvg,);
export const PoiMap = reactifySvelte<PoiMapProps>(_PoiMap);
export const Table = reactifySvelte<TableProps>(_Table);
