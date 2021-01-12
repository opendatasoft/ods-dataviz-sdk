export interface ColorConfiguration {
    type: ColorConfigurationTypes;
    colors: string[];
}

export interface ChartOptions {
    /** Chart aspect ratio */
    aspectRatio?: number;
    /** Chart type */
    type: 'bar' | 'line' | 'pie' | 'scatter' | 'bubble' | 'doughnut' | 'polarArea' | 'radar';

    //FIXME: Maybe the following options should be in an array...
    /** Dataset label */
    label: string;
    /** Field name to use as the X axis */
    xAxis: string;
    /** Field name to use as the Y axis */
    yAxis: string;
    /** Configuration of colors used for the bars */
    colorConfiguration: ColorConfiguration;
}

export type ColorConfigurationTypes = 'roundrobin';

export type DataFrame = Record<string, any>[];
