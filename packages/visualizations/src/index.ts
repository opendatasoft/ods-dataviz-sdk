/* WARNING: do NOT use alisases, in this specific file. 
Only path working at runtime will work (it's a problem with TS that copy aliases into .d.ts)
Anywhere else, aliases are fine :)
*/

/* We export Svelte types from the main package to avoid conflicting versions
It still is purely a dev thing and we'll bundle they types directly */
// eslint-disable-next-line import/no-extraneous-dependencies
export type { ComponentConstructorOptions, SvelteComponent } from 'svelte';
export { default as Chart, _ChartDataLabels } from './components/Chart';
export * from './components/Chart/types';
export { default as ChoroplethSvg } from './components/ChoroplethMap/Svg';
export * from './components/ChoroplethMap/types';
export { ChoroplethGeoJson, ChoroplethVectorTiles } from './components/ChoroplethMap/WebGl';
export { default as KpiCard } from './components/KpiCard';
export * from './components/KpiCard/types';
export * from './components/Legend/types';
export * from './components/Map';
export { default as MarkdownText } from './components/MarkdownText';
export * from './components/MarkdownText/types';
export * from './components/Pagination/types';
export { default as Table } from './components/Table';
export * from './components/Table/types';
export {
    BooleanFormat,
    DateFormat,
    GeoFormat,
    TextFormat,
    NumberFormat,
    URLFormat,
} from './components/Format';
export * from './components/Format/types';
export * from './components/utils';
export * from './types';
