/* eslint-disable no-underscore-dangle */
import type { Plugin, ChartConfiguration, ChartDataset } from 'chart.js';

const pieDataLabelsPlugin: Plugin<'pie'> = {
    id: 'ods-chartjs-plugin-datalabels',
    afterDraw: (chart) => {
        const { type } = chart.config as ChartConfiguration<'pie'>;
        const { datalabels } = chart.config.data.datasets?.[0] as ChartDataset<'pie'>;
        if (type === 'pie' && datalabels?.display) {
            const { ctx } = chart;
            ctx.save();
            const chartCenterPoint = {
                x: (chart.chartArea.right - chart.chartArea.left) / 2 + chart.chartArea.left,
                y: (chart.chartArea.bottom - chart.chartArea.top) / 2 + chart.chartArea.top,
            };

            const { labels, datasets } = chart.config.data;
            // FIXME: There seems to be a problem with the `Color` type of ChartJS, originally, the `Color` type allowed
            // ... string[] but not anymore (we should write an issue on their repo).
            const backgroundColor = datasets[0]?.backgroundColor as string[] | undefined;

            labels?.forEach((_, i) => {
                // We ensure that the legend item is visible and not hidden
                if (chart.getDataVisibility(i)) {
                    // FIXME: Why do we have to use `as any` instead of `as ArcElement` to type `acr`, even tho
                    // ... `arc instanceof ArcElement` returns true?
                    const arc = chart.getDatasetMeta(0).data[i] as any; // eslint-disable-line @typescript-eslint/no-explicit-any
                    // Get the center of the chart and the center point of the slice to determine the angle
                    const centerPoint = arc.getCenterPoint();

                    const angle = Math.atan2(
                        centerPoint.y - chartCenterPoint.y,
                        centerPoint.x - chartCenterPoint.x
                    );

                    // Check for offset on datalabels
                    let datalabelsOffset = 0;
                    // FIXME: As warn by chartjs-plugin-datalabels, we should not access private properties or methods starting
                    // ... with `$` or `_`.  The implementation can change at any version and could break.
                    if (arc?.$datalabels[0]?._model?.offset) {
                        datalabelsOffset = arc?.$datalabels[0]?._model.offset;
                    }

                    // Get a first drawing point
                    const point1X = chartCenterPoint.x + Math.cos(angle) * (arc.outerRadius - 8);
                    const point1Y = chartCenterPoint.y + Math.sin(angle) * (arc.outerRadius - 8);
                    // Get the second point depending of its position
                    const point2X =
                        chartCenterPoint.x +
                        Math.cos(angle) * (arc.outerRadius + 4 + datalabelsOffset);
                    const point2Y =
                        chartCenterPoint.y +
                        Math.sin(angle) * (arc.outerRadius + 4 + datalabelsOffset);

                    // Draw line between center of the slice and label
                    if (backgroundColor?.[i]) {
                        ctx.strokeStyle = backgroundColor[i];
                    }
                    ctx.beginPath();
                    ctx.lineWidth = 2;
                    ctx.moveTo(point1X, point1Y);
                    ctx.lineTo(point2X, point2Y);
                    ctx.stroke();
                }
            });
            ctx.restore();
        }
    },
};

export default pieDataLabelsPlugin;
