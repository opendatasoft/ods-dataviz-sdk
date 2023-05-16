export const LEGEND_POSITIONS = {
    right: 'right',
    bottom: 'bottom',
    top: 'top',
    left: 'left',
} as const;
export type LegendPosition = typeof LEGEND_POSITIONS[keyof typeof LEGEND_POSITIONS];

export interface LegendLabelsConfiguration {
    text?: (legendIndex: number) => string;
}

export interface LegendConfiguration {
    display?: boolean;
    position?: LegendPosition;
    align?: 'start' | 'center' | 'end';
    labels?: LegendLabelsConfiguration;
    boxStyle?: 'rect' | 'line' | 'dash';
    /** Wether to use ChartJS legend or homemade one
    NOTE: temporary API for backward compatibility
     */
    custom?: boolean;
}
