import {
    Chart as _Chart,
    KpiCard as _KpiCard,
    MarkdownText as _MarkdownText,
    ChoroplethGeoJson as _ChoroplethGeoJson,
    ChoroplethVectorTiles as _ChoroplethVectorTiles,
    ChoroplethSvg as _ChoroplethSvg,
    PoiMap as _PoiMap,
} from '@opendatasoft/visualizations';
import reactifySvelte from 'reactify';

export const Chart = reactifySvelte(_Chart);
export const KpiCard = reactifySvelte(_KpiCard);
export const MarkdownText = reactifySvelte(_MarkdownText);
export const ChoroplethGeoJson = reactifySvelte(_ChoroplethGeoJson);
export const ChoroplethVectorTiles = reactifySvelte(_ChoroplethVectorTiles);
export const ChoroplethSvg = reactifySvelte(_ChoroplethSvg);
export const PoiMap = reactifySvelte(_PoiMap);
export { reactifySvelte };
export type { Props } from 'reactify';