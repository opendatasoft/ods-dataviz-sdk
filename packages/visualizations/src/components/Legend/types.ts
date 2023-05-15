
export const LEGEND_POSITIONS = {
    right: 'right',
    bottom: 'bottom',
} as const;
export type LegendPosition = typeof LEGEND_POSITIONS[keyof typeof LEGEND_POSITIONS];