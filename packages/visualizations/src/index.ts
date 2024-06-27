export { default as Chart, _ChartDataLabels } from 'components/Chart';
export { default as MarkdownText } from 'components/MarkdownText';
export { default as KpiCard } from 'components/KpiCard';
export { ChoroplethGeoJson, ChoroplethVectorTiles } from 'components/ChoroplethMap/WebGl';
export { default as ChoroplethSvg } from 'components/ChoroplethMap/Svg';
export { default as Table } from 'components/Table';

export * from 'components/Map';

export * from 'types';
export * from 'components/types';
export * from 'components/Chart/types';
export * from 'components/KpiCard/types';
export * from 'components/ChoroplethMap/types';
export * from 'components/MarkdownText/types';
export * from 'components/Legend/types';
export * from 'components/Table/types';
export * from 'components/Pagination/types';
export * from 'components/utils';

/* We export Svelte types from the main package to avoid conflicting versions
It still is purely a dev thing and we'll bundle they types directly */
// eslint-disable-next-line import/no-extraneous-dependencies
export type { SvelteComponent, ComponentConstructorOptions } from 'svelte';
