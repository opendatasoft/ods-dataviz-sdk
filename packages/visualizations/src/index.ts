export { default as Chart, _ChartJs, _ChartDataLabels } from './components/Chart';
export { default as MarkdownText } from './components/MarkdownText';
export { default as KpiCard } from './components/KpiCard';
export { ChoroplethGeoJson, ChoroplethVectorTiles } from './components/Map/WebGl';
export { default as ChoroplethSvg } from './components/Map/Svg';
export { default as PoiMap } from './components/MapPoi';
export { default as Table } from './components/Table';

export * from './types';
export * from './components/types';
export * from './components/Chart/types';
export * from './components/KpiCard/types';
export * from './components/Map/types';
export * from './components/MarkdownText/types';
export * from './components/MapPoi/types';
export * from './components/Legend/types';
export * from './components/Table/types';
export * from './components/Pagination/types';

/* We export Svelte types from the main package to avoid conflicting versions
It still is purely a dev thing and we'll bundle they types directly */
// eslint-disable-next-line import/no-extraneous-dependencies
export type { SvelteComponent, ComponentConstructorOptions } from 'svelte';
