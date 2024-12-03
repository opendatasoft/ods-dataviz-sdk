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
    WebGlMap as _WebGlMap,
    BooleanFormat as _BooleanFormat,
    DateFormat as _DateFormat,
    GeoFormat as _GeoFormat,
    LongTextFormat as _LongTextFormat,
    ShortTextFormat as _ShortTextFormat,
    URLFormat as _URLFormat,
    NumberFormat as _NumberFormat,
} from '@opendatasoft/visualizations';
import type {
    ChartProps,
    KpiProps,
    MarkdownTextProps,
    ChoroplethGeoJsonProps,
    ChoroplethVectorTilesProps,
    PoiMapProps,
    WebGlMapProps,
    TableProps,
    BooleanFormatProps,
    DateFormatProps,
    GeoFormatProps,
    LongTextFormatProps,
    ShortTextFormatProps,
    URLFormatProps,
    NumberFormatProps,
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
export const PoiMap = reactifySvelte<PoiMapProps>(_PoiMap, 'ods-visualizations-poi-map');
export const WebGlMap = reactifySvelte<WebGlMapProps>(_WebGlMap, 'ods-visualizations-webgl-map');
export const Table = reactifySvelte<TableProps>(_Table, 'ods-visualizations-table');
export const BooleanFormat = reactifySvelte<BooleanFormatProps>(
    _BooleanFormat,
    'ods-visualizations-format-boolean'
);
export const DateFormat = reactifySvelte<DateFormatProps>(
    _DateFormat,
    'ods-visualizations-format-date'
);
export const GeoFormat = reactifySvelte<GeoFormatProps>(
    _GeoFormat,
    'ods-visualizations-format-geo'
);
export const ShortTextFormat = reactifySvelte<ShortTextFormatProps>(
    _ShortTextFormat,
    'ods-visualizations-format-shorttext'
);
export const LongTextFormat = reactifySvelte<LongTextFormatProps>(
    _LongTextFormat,
    'ods-visualizations-format-longtext'
);
export const NumberFormat = reactifySvelte<NumberFormatProps>(
    _NumberFormat,
    'ods-visualizations-format-number'
);
export const URLFormat = reactifySvelte<URLFormatProps>(
    _URLFormat,
    'ods-visualizations-format-url'
);
