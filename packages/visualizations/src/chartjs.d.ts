import * as chartJS from 'chart.js'; // eslint-disable-line @typescript-eslint/no-unused-vars

// See: https://github.com/y-takey/chartjs-plugin-stacked100/issues/54
declare module 'chart.js' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    export interface PluginOptionsByType<TType extends ChartType> {
        stacked100: {
            enable: boolean;
            replaceTooltipLabel?: boolean;
            fixNegativeScale?: boolean;
            precision?: number;
        };
    }
}
