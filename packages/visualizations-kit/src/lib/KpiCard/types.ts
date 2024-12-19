import type { Async, Source } from '$lib/types';

export interface KpiCardOptions {
	title?: string;
	description?: string;
	imgSrc?: string;
	color?: string;
	prefix?: string;
	suffix?: string;
	header?: string;
	footer?: string;
	/** Link button to source */
	source?: Source;
	/** Custom formatting function to display data value */
	formatCompact?: (value: number) => string;
	/** Custom formatting function for tooltips content */
	format?: (value: number) => string;
}

export type KpiProps = {
	data: Async<number>;
	options: KpiCardOptions;
};
